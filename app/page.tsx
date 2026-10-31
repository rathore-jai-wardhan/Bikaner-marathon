import Header from '@/components/Header'
import Hero from '@/components/hero'
import RaceCategories from '@/components/race_categories'
import AboutUs from '@/components/about_us'
import Footer from '@/components/footer'
import LaunchConfetti from '@/components/confetti'
import Partners from '@/components/partners'

export default function Home() {
  return (
    <main>
      <LaunchConfetti />
      <Header />
      <Hero />
      <RaceCategories />
      <Partners />
      <AboutUs />
      <Footer />
    </main>
  )
}