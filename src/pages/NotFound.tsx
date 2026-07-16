import { Link } from 'react-router-dom'
import { useUI } from '@/i18n/hooks'
import { useLocale } from '@/i18n/localeContext'

export default function NotFound() {
  const ui = useUI()
  const locale = useLocale()

  return (
    <div className="container-main" style={{ paddingTop: '10rem', paddingBottom: '6rem', textAlign: 'center' }}>
      <h1 className="text-h1">{ui.notFound.heading}</h1>
      <p className="text-body-lg" style={{ marginTop: '1rem' }}>{ui.notFound.body}</p>
      <Link to={locale === 'es' ? '/es' : '/'} className="btn-primary" style={{ marginTop: '2rem', display: 'inline-flex' }}>
        {ui.notFound.backLink}
      </Link>
    </div>
  )
}
