'use client'

import { useEffect, useState, type CSSProperties } from 'react'

// Drifting sand specks: fixed positions so the server and browser render the same thing
const SAND = [
  { left: 61, bottom: 7, dur: 8.4, delay: 0.5 },
  { left: 88, bottom: 6, dur: 8.2, delay: 0.6 },
  { left: 84, bottom: 9, dur: 6.2, delay: 4.3 },
  { left: 28, bottom: 10, dur: 6.5, delay: 4.2 },
  { left: 92, bottom: 6, dur: 11.7, delay: 6.3 },
  { left: 94, bottom: 4, dur: 9.5, delay: 4.0 },
  { left: 48, bottom: 4, dur: 9.3, delay: 1.3 },
  { left: 73, bottom: 7, dur: 9.2, delay: 5.7 },
  { left: 91, bottom: 29, dur: 10.1, delay: 1.0 },
  { left: 93, bottom: 23, dur: 7.1, delay: 1.0 },
  { left: 28, bottom: 21, dur: 6.4, delay: 2.1 },
  { left: 88, bottom: 16, dur: 10.7, delay: 4.7 },
  { left: 78, bottom: 14, dur: 7.8, delay: 7.9 },
  { left: 51, bottom: 5, dur: 9.4, delay: 5.3 },
]

// One-hump camel (dromedary), walking right
function Camel({ delay }: { delay: number }) {
  return (
    <svg className="bm-unit" viewBox="0 0 200 156" aria-hidden="true" style={{ '--d': `${delay}s` } as CSSProperties}>
      <g className="bm-camel">
        <path className="bm-tail" d="M42,70 C34,76 31,88 33,100" strokeWidth="3" strokeLinecap="round" />
        <g className="bm-leg a"><path d="M56,92 h9 l-1,30 l1,30 h-7 l-1,-30 z" /></g>
        <g className="bm-leg b"><path d="M128,92 h9 l-1,30 l1,30 h-7 l-1,-30 z" /></g>
        <path d="M40,72 C39,58 50,50 62,46 C69,27 96,20 110,38 C121,42 132,45 141,53 C149,47 155,37 159,28 C161,21 168,18 177,20 C186,22 194,26 196,31 C197,35 192,37 187,36 L181,36 C177,41 172,50 166,62 C160,74 152,86 146,93 C141,99 131,101 119,101 L62,101 C49,101 41,91 40,72 Z" />
        <path d="M178,24 l3,-6 l2,7 z" />
        <g className="bm-leg b"><path d="M68,92 h9 l-1,30 l1,30 h-7 l-1,-30 z" /></g>
        <g className="bm-leg a"><path d="M140,92 h9 l-1,30 l1,30 h-7 l-1,-30 z" /></g>
      </g>
    </svg>
  )
}

// Herder in white kurta and dhoti, white pagdi, with a lathi
function Herder() {
  return (
    <svg className="bm-herder" viewBox="0 0 40 100" aria-hidden="true" style={{ '--d': '0s' } as CSSProperties}>
      <line x1="33" y1="34" x2="40" y2="98" className="bm-lathi" />
      <g className="bm-leg a"><rect x="15" y="62" width="6" height="34" rx="2" className="bm-white" /></g>
      <g className="bm-leg b"><rect x="21" y="62" width="6" height="34" rx="2" className="bm-white" /></g>
      <path d="M11,26 C11,22 31,22 31,26 L33,66 L9,66 Z" className="bm-white" />
      <path d="M26,30 L35,36" className="bm-arm" />
      <circle cx="21" cy="17" r="6" className="bm-skin" />
      <path d="M15,13 C15,5 28,4 28,12 C30,13 29,16 26,15 C22,13 18,13 15,15 Z" className="bm-white" />
      <path d="M27,12 C33,12 34,18 31,22" className="bm-pagdi-tail" />
      <path d="M18,20 q3,2 6,0" className="bm-mustache" />
    </svg>
  )
}

export default function Hero() {
  // Motion starts 1 second after the page loads
  const [go, setGo] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setGo(true), 1000)
    return () => clearTimeout(t)
  }, [])

  return (
    <section className={`bm-hero${go ? ' bm-go' : ''}`}>
      {/* Heat-haze ripple used on laptops */}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <filter id="bm-heat" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.008 0.06" numOctaves={1} seed={3}>
            <animate attributeName="baseFrequency" dur="9s" values="0.008 0.06;0.008 0.075;0.008 0.06" repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" scale={4} />
        </filter>
      </svg>

      <div className="bm-sun" />
      <svg className="bm-birds" viewBox="0 0 120 40" aria-hidden="true">
        <path d="M5,20 q6,-8 12,0 q6,-8 12,0" />
        <path d="M45,10 q5,-6 10,0 q5,-6 10,0" />
        <path d="M80,24 q4,-5 8,0 q4,-5 8,0" />
      </svg>

      <div className="bm-fort">
        <img src="/hero/junagarh-fort.webp" alt="Junagarh Fort, Bikaner" width={870} height={287} fetchPriority="high" />
      </div>

      <div className="bm-dune bm-d1">
        <svg viewBox="0 0 2000 100" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0,60 C150,20 300,30 500,55 C700,80 850,25 1000,60 C1150,20 1300,30 1500,55 C1700,80 1850,25 2000,60 V100 H0Z" />
        </svg>
      </div>
      <div className="bm-dune bm-d2">
        <svg viewBox="0 0 2000 100" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0,50 C200,10 380,70 560,40 C740,10 880,60 1000,50 C1200,10 1380,70 1560,40 C1740,10 1880,60 2000,50 V100 H0Z" />
        </svg>
      </div>

      <div className="bm-caravan" aria-hidden="true">
        <Camel delay={0} />
        <Camel delay={0.3} />
        <Camel delay={0.6} />
        <Herder />
      </div>

      <div className="bm-dune bm-d3">
        <svg viewBox="0 0 2000 100" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0,40 C250,70 450,20 700,45 C850,60 920,40 1000,40 C1250,70 1450,20 1700,45 C1850,60 1920,40 2000,40 V100 H0Z" />
        </svg>
      </div>

      {SAND.map((s, i) => (
        <span
          key={i}
          className="bm-sand"
          style={{ left: `${s.left}%`, bottom: `${s.bottom}%`, animationDuration: `${s.dur}s`, animationDelay: `-${s.delay}s` }}
        />
      ))}

      <div className="bm-copy">
        <div className="bm-venue">
          Venue Partner:
          <a href="https://www.laxminiwaspalace.com" target="_blank" rel="noopener noreferrer">
            <img src="/partners/laxmi-niwas-palace.jpeg" alt="" />
            <span>The Laxmi Niwas Palace</span>
          </a>
        </div>
        <h1>
          BIKANER
          <br />
          <span>MARATHON</span>
        </h1>
        <div className="bm-tag">Run for fitness, unity, and a drug free Bikaner.</div>
        <div className="bm-date">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <rect x="3" y="5" width="18" height="16" rx="2" />
            <path d="M3 10h18M8 3v4M16 3v4" />
          </svg>
          27th December 2026
        </div>
      </div>
    </section>
  )
}
