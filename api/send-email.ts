import type { IncomingMessage, ServerResponse } from 'http'
import { Resend } from 'resend'
import { z } from 'zod'
import { contactEmailHtml } from './templates/contact.js'

// ─── In-memory rate limiting ───────────────────────────────────
const RL = new Map<string, { count: number; resetAt: number }>()
const RL_MAX = 5 // max 5 submissions per IP
const RL_WINDOW = 300_000 // per 5 minutes

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = RL.get(ip)
  if (!entry || entry.resetAt < now) {
    RL.set(ip, { count: 1, resetAt: now + RL_WINDOW })
    return true
  }
  if (entry.count >= RL_MAX) return false
  entry.count++
  return true
}

// NOTE: replace with the actual deployed domain(s) once known (see README /
// HANDOFF for this step) — until then this stays permissive enough to work
// from the Vercel preview/production URLs, tightened once a final domain exists.
const ALLOWED_ORIGIN_SUFFIXES = ['.vercel.app']

function isOriginAllowed(origin: string): boolean {
  return ALLOWED_ORIGIN_SUFFIXES.some((suffix) => origin.endsWith(suffix)) || origin.includes('localhost')
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

const schema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  message: z.string().min(10).max(1000),
  website: z.string().optional(), // honeypot — must arrive empty
})

type Req = IncomingMessage & { body?: unknown }
type Res = ServerResponse & {
  status(code: number): Res
  json(data: unknown): void
}

export default async function handler(req: Req, res: Res) {
  const origin = req.headers.origin ?? ''
  const allowed = isOriginAllowed(origin)
  if (allowed) res.setHeader('Access-Control-Allow-Origin', origin)
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  res.setHeader('Vary', 'Origin')

  if (req.method === 'OPTIONS') return res.status(204).json({})
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  if (!allowed) return res.status(403).json({ error: 'Origin not allowed' })

  const ip =
    (req.headers['x-forwarded-for'] as string)?.split(',').at(-1)?.trim() ??
    req.socket?.remoteAddress ??
    'unknown'

  if (!checkRateLimit(ip)) {
    res.setHeader('Retry-After', '300')
    return res.status(429).json({ error: 'Too many submissions. Please wait a few minutes.' })
  }

  const parsed = schema.safeParse(req.body)
  if (!parsed.success) {
    return res.status(400).json({ error: 'Invalid data', details: parsed.error.flatten() })
  }

  // Honeypot: a filled hidden field means a bot — respond 200 without sending.
  if (parsed.data.website) {
    return res.status(200).json({ ok: true })
  }

  const { name, email, message } = parsed.data
  const safe = { name: escapeHtml(name), email: escapeHtml(email), message: escapeHtml(message) }

  const apiKey = process.env.RESEND_API_KEY
  const toEmail = process.env.CONTACT_TO_EMAIL ?? 'rangel1998.rt@gmail.com'

  if (!apiKey) {
    console.error('[send-email] RESEND_API_KEY not configured')
    return res.status(503).json({ error: 'Service unavailable' })
  }

  const resend = new Resend(apiKey)

  try {
    await resend.emails.send({
      // Resend's shared testing sender — works without verifying a custom
      // domain. Once a domain is verified in Resend, swap this for
      // e.g. 'Portfolio <contact@yourdomain.dev>'.
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: toEmail,
      replyTo: safe.email,
      subject: `[Portfolio] New message from ${safe.name}`,
      html: contactEmailHtml(safe),
    })

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('[send-email] Resend error:', err)
    return res.status(500).json({ error: 'Failed to send email' })
  }
}
