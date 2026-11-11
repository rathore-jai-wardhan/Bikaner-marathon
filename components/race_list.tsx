'use client'

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import RouteMap, { type StravaRoute } from './route_map'

export type Race = {
  key: string
  distance: string
  name: string
  km: number
  fee: number
  tagline: string
  includes: boolean[]
  route?: StravaRoute
  categoryId: string | null
}

const FULL_KM = 21.1
const TICKS = [0, 5, 10, 15, 21]

const ITEMS: { label: string; icon: ReactNode }[] = [
  { label: 'T-shirt', icon: <path d="M8 3 4 5.5 2 10l3 1.5V21h14v-9.5L22 10l-2-4.5L16 3c-.5 1.6-2 2.6-4 2.6S8.5 4.6 8 3Z" /> },
  {
    label: 'BIB',
    icon: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <circle cx="7" cy="7" r=".8" />
        <circle cx="17" cy="7" r=".8" />
        <path d="M8.5 15V10l-1.5 1M12 10h3v2.5h-3V15h3" />
      </>
    ),
  },
  {
    label: 'Medal',
    icon: (
      <>
        <path d="M8 2h3l1 5M16 2h-3l-1 5" />
        <circle cx="12" cy="15" r="6" />
        <path d="m12 12 1 2 2 .3-1.5 1.4.4 2.1-1.9-1-1.9 1 .4-2.1L9 14.3l2-.3z" />
      </>
    ),
  },
  { label: 'Refreshments', icon: <path d="M9 2h6M10 2v3l-2 3v12a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V8l-2-3V2M8 12h8" /> },
  { label: 'Prizes', icon: <path d="M7 4h10v5a5 5 0 0 1-10 0V4ZM7 6H4a3 3 0 0 0 3 4M17 6h3a3 3 0 0 1-3 4M12 14v4M8 21h8M9 18h6" /> },
  {
    label: 'Breakfast',
    icon: (
      <>
        <path d="M4 10h12v4a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5v-4ZM16 11h1.5a2.5 2.5 0 0 1 0 5H15.5" />
        <path d="M8 3.5c-.8 1 .8 2 0 3M12 3.5c-.8 1 .8 2 0 3M3 21h14" />
      </>
    ),
  },
]

export default function RaceList({ races }: { races: Race[] }) {
  const root = useRef<HTMLDivElement>(null)
  // Which route maps are open (maps start closed so phones don't load four maps at once)
  const [openMaps, setOpenMaps] = useState<Record<string, boolean>>({})
  const toggleMap = (key: string) => setOpenMaps((m) => ({ ...m, [key]: !m[key] }))

  // Fade each card in (and fill its distance bar) when it scrolls into view
  useEffect(() => {
    const els = root.current?.querySelectorAll<HTMLElement>('.rc-reveal')
    if (!els) return
    if (!('IntersectionObserver' in window)) {
      els.forEach((e) => e.classList.add('rc-in'))
      return
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('rc-in')
            io.unobserve(e.target)
          }
        }),
      { threshold: 0.25 }
    )
    els.forEach((e) => io.observe(e))
    return () => io.disconnect()
  }, [])

  return (
    <div ref={root}>
      <section className="rc-races" aria-label="Race categories">
        {races.map((r, i) => {
          const href = r.categoryId ? `/register?category=${encodeURIComponent(r.categoryId)}` : '/register'
          const style = { '--d': `${i * 90}ms`, '--w': `${((r.km / FULL_KM) * 100).toFixed(2)}%` } as CSSProperties
          const mapOpen = !!openMaps[r.key]
          return (
            <div key={r.key} className="rc-item rc-reveal" style={style} id={`race-${r.key}`}>
              <article className={mapOpen ? 'rc-race rc-open' : 'rc-race'}>
                <div className="rc-id">
                  <div className="rc-dist">{r.distance}</div>
                  <div>
                    <h3>{r.name}</h3>
                    <p className="rc-tag">{r.tagline}</p>
                  </div>
                </div>

                <div className="rc-mid">
                  <div className="rc-track" aria-label={`${r.km} kilometres`}>
                    <div className="rc-lane">
                      <div className="rc-fill">
                        <span className="rc-runner" />
                      </div>
                    </div>
                    <div className="rc-ticks" aria-hidden="true">
                      {TICKS.map((k) => (
                        <i key={k} style={{ left: `${(k / FULL_KM) * 100}%` }}>
                          {k === 21 ? '21 km' : k}
                        </i>
                      ))}
                    </div>
                  </div>
                  <ul className="rc-chips">
                    {ITEMS.map((item, j) => {
                      const yes = r.includes[j]
                      return (
                        <li
                          key={item.label}
                          className={yes ? 'rc-chip' : 'rc-chip rc-no'}
                          aria-label={`${item.label}: ${yes ? 'included' : 'not included'}`}
                        >
                          <svg viewBox="0 0 24 24" aria-hidden="true">
                            {item.icon}
                          </svg>
                          <span>{item.label}</span>
                        </li>
                      )
                    })}
                  </ul>
                </div>

                <div className="rc-cta">
                  <div className="rc-fee">
                    <small>Entry fee</small>₹{r.fee}
                  </div>
                  <a className="rc-btn" href={href} target="_blank" rel="noopener noreferrer">
                    Register
                  </a>
                  {r.route && (
                    <button
                      type="button"
                      className="rc-map-toggle"
                      aria-expanded={mapOpen}
                      aria-controls={`route-${r.key}`}
                      onClick={() => toggleMap(r.key)}
                    >
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2Zm0 0v14m6-12v14" />
                      </svg>
                      {mapOpen ? 'Hide route' : 'View route'}
                      <svg className="rc-chev" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </button>
                  )}
                </div>
              </article>

              {r.route && mapOpen && (
                <div className="rc-map-panel" id={`route-${r.key}`}>
                  <RouteMap route={r.route} title={`${r.distance} ${r.name}`} />
                </div>
              )}
            </div>
          )
        })}
      </section>

      <section className="rc-premium rc-reveal" style={{ '--d': '360ms' } as CSSProperties} aria-label="Premium registration">
        <div className="rc-premium-in">
          <div className="rc-lock" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="#4a2408" strokeWidth="2" strokeLinecap="round">
              <rect x="5" y="11" width="14" height="10" rx="2" fill="rgba(74,36,8,.15)" />
              <path d="M8 11V8a4 4 0 0 1 8 0v3" />
              <circle cx="12" cy="16" r="1.2" fill="#4a2408" />
            </svg>
          </div>
          <div>
            <div className="rc-ex">★ EXCLUSIVE ★</div>
            <h3>Premium Add On</h3>
          </div>
          <span className="rc-soon">Opening soon</span>
        </div>
      </section>
      <p className="rc-note">* It is an optional add-on. Register for any race as usual, then pay a little extra to get exclusive extras.</p>
    </div>
  )
}
