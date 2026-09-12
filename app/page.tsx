import Header from '@/components/Header'
import Hero from '@/components/hero'
import RaceCategories from '@/components/race_categories'
import AboutUs from '@/components/about_us'
import Footer from '@/components/footer'

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <RaceCategories />
      <AboutUs />
      <Footer />
    </main>
  )
}