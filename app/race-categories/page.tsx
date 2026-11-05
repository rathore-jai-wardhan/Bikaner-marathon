import type { Metadata } from 'next'
import { Cinzel } from 'next/font/google'
import { sql } from '@/lib/db'
import RaceList, { type Race } from '@/components/race_list'
import './race-categories.css'

export const metadata: Metadata = {
  title: 'Race Categories | Bikaner Marathon',
  description: 'Choose your race: 2K Fun Run, 5K Run, 10K Challenge Run or 21K Half Marathon.',
}

// Re-check the database at most once a minute, so price changes show up quickly
export const revalidate = 60

const cinzel = Cinzel({ subsets: ['latin'], weight: ['700'], variable: '--font-ornate' })

// What each race is and what it includes.
// "fee" is only a fallback: the live price comes from the categories table.
// includes order: T-shirt, BIB, Medal, Refreshments, Prizes (true = included)
const RACES: Omit<Race, 'categoryId'>[] = [
  { key: '2k', distance: '2K', name: 'Fun Run', km: 2, fee: 149, tagline: 'For families, kids and first-timers', includes: [true, false, false, false, false] },
  { key: '5k', distance: '5K', name: 'Run', km: 5, fee: 299, tagline: 'A great first race', includes: [true, true, true, true, true] },
  { key: '10k', distance: '10K', name: 'Challenge Run', km: 10, fee: 399, tagline: 'For regular runners', includes: [true, true, true, true, true] },
  { key: '21k', distance: '21K', name: 'Half Marathon', km: 21.1, fee: 499, tagline: 'The big one', includes: [true, true, true, true, true] },
]

type CategoryRow = { id: string; name: string; price_paise: number }

async function openCategories(): Promise<CategoryRow[]> {
  try {
    return (await sql`
      select id, name, price_paise
      from categories
      where is_open = true
    `) as CategoryRow[]
  } catch (err) {
    // If the database can't be reached, still show the page; Register opens the form without a preselection
    console.error('race-categories: could not load categories', err)
    return []
  }
}

export default async function RaceCategoriesPage() {
  const rows = await openCategories()

  // Match each race to its database row by the start of the name, e.g. "21K Half Marathon" -> 21K
  const races: Race[] = RACES.map((r) => {
    const row = rows.find((c) => new RegExp(`^\\s*${r.distance}\\b`, 'i').test(c.name))
    return {
      ...r,
      categoryId: row?.id ?? null,
      fee: row ? Math.round(row.price_paise / 100) : r.fee,
    }
  })

  return (
    <main className={`rc-page ${cinzel.variable}`}>
      <section className="rc-intro">
        <h1>
          Choose your <em>race</em>
        </h1>
        <p>Four distances, one city. Pick the one that suits you. Everything you get is listed right here.</p>
      </section>

      <RaceList races={races} />

      <section className="rc-route">
        <h2>Race Routes</h2>
        <p>Coming soon</p>
      </section>
    </main>
  )
}
