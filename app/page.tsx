import Hero from '@/components/hero'
import AboutUs from '@/components/about_us'
import Partners from '@/components/partners'
import PrizePool from '@/components/prize_pool'

// Header and footer come from app/layout.tsx, so they appear on every page
export default function Home() {
  return (
    <main>
      <Hero />
      <AboutUs />
      <PrizePool />
      <Partners />
    </main>
  )
}
