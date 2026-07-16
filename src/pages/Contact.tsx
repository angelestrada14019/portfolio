import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { usePageMeta } from '@/hooks/usePageMeta'
import { useSiteData } from '@/i18n/hooks'
import { MagneticButton } from '@/components/ui/MagneticButton'

const contactSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  message: z.string().min(10).max(1000),
  website: z.string().max(0).optional(), // honeypot — must stay empty
})

type ContactForm = z.infer<typeof contactSchema>

export default function Contact() {
  const siteData = useSiteData()
  usePageMeta(siteData.meta.contact.title, siteData.meta.contact.description)

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactForm) => {
    setStatus('submitting')
    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Request failed')
      setStatus('success')
      reset()
    } catch {
      setStatus('error')
    }
  }

  const f = siteData.contact.form

  return (
    <div style={{ paddingTop: '8rem', paddingBottom: 'var(--spacing-section)' }}>
      <div className="container-main" style={{ maxWidth: '36rem' }}>
        <h1 className="text-h1" style={{ marginBottom: '0.75rem' }}>{siteData.contact.heading}</h1>
        <p className="text-body-lg" style={{ marginBottom: '2.5rem' }}>{siteData.contact.subhead}</p>

        {status === 'success' ? (
          <div className="contact-success">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path className="success-check" d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div>
              <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{f.successHeading}</p>
              <p style={{ color: 'var(--color-ink-soft)' }}>{f.successBody}</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="contact-form-card" noValidate>
            {/* Honeypot — hidden from real users, bots often fill every field */}
            <input
              {...register('website')}
              type="text"
              tabIndex={-1}
              autoComplete="off"
              style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0 }}
              aria-hidden="true"
            />

            <div style={{ marginBottom: '1.25rem' }}>
              <label htmlFor="name" className="text-label" style={{ display: 'block', marginBottom: '0.5rem' }}>{f.nameLabel}</label>
              <input
                id="name"
                {...register('name')}
                style={{
                  width: '100%', padding: '0.75rem 1rem', borderRadius: '0.5rem',
                  border: `1px solid ${errors.name ? 'var(--color-error)' : 'var(--color-line)'}`,
                  fontFamily: 'var(--font-sans)', fontSize: '0.9375rem', background: 'var(--color-bg)',
                }}
              />
              {errors.name && <p style={{ color: 'var(--color-error)', fontSize: '0.8125rem', marginTop: '0.375rem' }}>{errors.name.message}</p>}
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label htmlFor="email" className="text-label" style={{ display: 'block', marginBottom: '0.5rem' }}>{f.emailLabel}</label>
              <input
                id="email"
                type="email"
                {...register('email')}
                style={{
                  width: '100%', padding: '0.75rem 1rem', borderRadius: '0.5rem',
                  border: `1px solid ${errors.email ? 'var(--color-error)' : 'var(--color-line)'}`,
                  fontFamily: 'var(--font-sans)', fontSize: '0.9375rem', background: 'var(--color-bg)',
                }}
              />
              {errors.email && <p style={{ color: 'var(--color-error)', fontSize: '0.8125rem', marginTop: '0.375rem' }}>{errors.email.message}</p>}
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label htmlFor="message" className="text-label" style={{ display: 'block', marginBottom: '0.5rem' }}>{f.messageLabel}</label>
              <textarea
                id="message"
                rows={5}
                placeholder={f.messagePlaceholder}
                {...register('message')}
                style={{
                  width: '100%', padding: '0.75rem 1rem', borderRadius: '0.5rem',
                  border: `1px solid ${errors.message ? 'var(--color-error)' : 'var(--color-line)'}`,
                  fontFamily: 'var(--font-sans)', fontSize: '0.9375rem', resize: 'vertical', background: 'var(--color-bg)',
                }}
              />
              {errors.message && <p style={{ color: 'var(--color-error)', fontSize: '0.8125rem', marginTop: '0.375rem' }}>{errors.message.message}</p>}
            </div>

            {status === 'error' && (
              <p style={{ color: 'var(--color-error)', fontSize: '0.875rem', marginBottom: '1rem' }}>{f.errorGeneric}</p>
            )}

            <MagneticButton type="submit">
              {status === 'submitting' ? f.submittingLabel : f.submitLabel}
            </MagneticButton>
          </form>
        )}
      </div>
    </div>
  )
}
