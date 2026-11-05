import Hero from '@/components/hero'
import AboutUs from '@/components/about_us'
import Partners from '@/components/partners'

// Header and footer come from app/layout.tsx, so they appear on every page
export default function Home() {
  return (
    <main>
      <Hero />
      <AboutUs />
      <Partners />
    </main>
  )
}
