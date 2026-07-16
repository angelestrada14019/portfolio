import { usePageMeta } from '@/hooks/usePageMeta'
import { useSiteData } from '@/i18n/hooks'
import { Hero } from '@/components/sections/Hero'
import { FeaturedProjects } from '@/components/sections/FeaturedProjects'
import { SkillsSummary } from '@/components/sections/SkillsSummary'

export default function Home() {
  const siteData = useSiteData()
  usePageMeta(siteData.meta.home.title, siteData.meta.home.description)

  return (
    <>
      <Hero />
      <FeaturedProjects />
      <SkillsSummary />
    </>
  )
}
