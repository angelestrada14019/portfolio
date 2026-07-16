import { useCallback, useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ScrollTrigger } from '@/lib/gsap'
import { useLenis } from '@/hooks/useLenis'
import { useScrollSetup } from '@/hooks/useScrollSetup'
import { CustomCursor } from '@/components/ui/CustomCursor'
import { Preloader } from '@/components/layout/Preloader'
import { PageTransition } from '@/components/layout/PageTransition'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { useLocale } from '@/i18n/localeContext'

import Home from '@/pages/Home'
import About from '@/pages/About'
import Projects from '@/pages/Projects'
import ProjectDetail from '@/pages/ProjectDetail'
import NotFound from '@/pages/NotFound'

function Layout() {
  const locale = useLocale()

  const [preloaderDone, setPreloaderDone] = useState(() =>
    sessionStorage.getItem('site-visited') === '1'
  )

  // Sync html[lang] + document meta with the active locale (client-side switching)
  useEffect(() => {
    document.documentElement.lang = locale
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 150)
    return () => window.clearTimeout(t)
  }, [locale])

  useLenis()
  useScrollSetup()

  const handlePreloaderComplete = useCallback(() => {
    sessionStorage.setItem('site-visited', '1')
    setPreloaderDone(true)
  }, [])

  return (
    <>
      <CustomCursor />
      {!preloaderDone && <Preloader onComplete={handlePreloaderComplete} />}
      <Navbar />
      <main>
        <PageTransition />
      </main>
      <Footer />
    </>
  )
}

const pageRoutes = (
  <>
    <Route index element={<Home />} />
    <Route path="about" element={<About />} />
    <Route path="projects" element={<Projects />} />
    <Route path="projects/:slug" element={<ProjectDetail />} />
  </>
)

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>{pageRoutes}</Route>
      <Route path="/en" element={<Layout />}>{pageRoutes}</Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
