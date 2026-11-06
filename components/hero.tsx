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

// Herder: big colourful pagdi, handlebar mustache, kurta, white dhoti, red juttis, with a lathi
function Herder() {
  return (
    <svg className="bm-herder" viewBox="0 0 44 104" aria-hidden="true" style={{ '--d': '0s' } as CSSProperties}>
      <defs>
        <clipPath id="bm-pagdi-clip">
          <path d="M12.5,16 C9,10 13,3.2 22,2.6 C31,2 35.5,8 33,15 C28,12.6 18,12.6 12.5,16 Z" />
        </clipPath>
      </defs>
      {/* lathi */}
      <line x1="35" y1="34" x2="42" y2="100" className="bm-lathi" />
      {/* legs: white dhoti and red juttis with curled toes */}
      <g className="bm-leg a">
        <path d="M14.5,62 h8 l-0.5,31 h-7 z" className="bm-dhoti" />
        <path d="M14,92.5 h8.5 c2.6,0 4.4,-0.8 5.6,-3.4 c0.4,3.4 -1.2,6.4 -5,6.4 h-9.1 z" className="bm-jutti" />
      </g>
      <g className="bm-leg b">
        <path d="M21,62 h8 l-0.5,31 h-7 z" className="bm-dhoti" />
        <path d="M20.5,92.5 h8.5 c2.6,0 4.4,-0.8 5.6,-3.4 c0.4,3.4 -1.2,6.4 -5,6.4 h-9.1 z" className="bm-jutti" />
      </g>
      {/* kurta */}
      <path d="M11,27 C11,23 32,23 32,27 L34.5,66 L8.5,66 Z" className="bm-kurta" />
      <path d="M21.5,25 V40" className="bm-kurta-line" />
      {/* arm holding the lathi */}
      <path d="M27,31 L36,38" className="bm-arm" />
      <circle cx="36.4" cy="38.4" r="2.1" className="bm-skin" />
      {/* head, ear, eyes */}
      <rect x="18.5" y="21" width="6" height="4" className="bm-skin" />
      <circle cx="21.5" cy="17.5" r="6.2" className="bm-skin" />
      <circle cx="15.6" cy="18" r="1.4" className="bm-skin" />
      <circle cx="20" cy="16.4" r="0.75" className="bm-eye" />
      <circle cx="24.4" cy="16.4" r="0.75" className="bm-eye" />
      {/* big handlebar mustache */}
      <path
        d="M22.2,19.6 c-1.4,-0.6 -3,-0.5 -4.1,0.4 c-1.1,0.9 -2.4,1 -3.6,0 c0.2,1.9 1.8,3 3.6,2.6 c1.8,-0.3 3.1,-1.3 4.1,-1.6 c1,0.3 2.3,1.3 4.1,1.6 c1.8,0.4 3.4,-0.7 3.6,-2.6 c-1.2,1 -2.5,0.9 -3.6,0 c-1.1,-0.9 -2.7,-1 -4.1,-0.4 z"
        className="bm-mustache"
      />
      {/* big colourful pagdi: rounded, wider than the head, striped bands */}
      <g clipPath="url(#bm-pagdi-clip)">
        <rect x="6" y="-10" width="34" height="30" fill="#c0392b" />
        <path d="M6,-1.0 L40,-10.0 L40,-7.1 L6,1.9 Z" fill="#6b2d5c" />
        <path d="M6,1.9 L40,-7.1 L40,-4.2 L6,4.8 Z" fill="#2e8b57" />
        <path d="M6,4.8 L40,-4.2 L40,-1.3 L6,7.7 Z" fill="#f2b632" />
        <path d="M6,7.7 L40,-1.3 L40,1.6 L6,10.6 Z" fill="#c0392b" />
        <path d="M6,10.6 L40,1.6 L40,4.5 L6,13.5 Z" fill="#2e8b57" />
        <path d="M6,13.5 L40,4.5 L40,7.4 L6,16.4 Z" fill="#e67e22" />
        <path d="M6,16.4 L40,7.4 L40,10.3 L6,19.3 Z" fill="#6b2d5c" />
        <path d="M6,19.3 L40,10.3 L40,13.2 L6,22.2 Z" fill="#f2b632" />
        <path d="M6,22.2 L40,13.2 L40,16.1 L6,25.1 Z" fill="#c0392b" />
        <path d="M6,25.1 L40,16.1 L40,19.0 L6,28.0 Z" fill="#e67e22" />
        <path d="M6,28.0 L40,19.0 L40,21.9 L6,30.9 Z" fill="#2e8b57" />
      </g>
      <path
        d="M12.5,16 C9,10 13,3.2 22,2.6 C31,2 35.5,8 33,15 C28,12.6 18,12.6 12.5,16 Z"
        className="bm-pagdi-edge"
      />
      <path d="M13,15.2 C18,12.8 27.5,12.6 32.6,14.6" className="bm-pagdi-fold" />
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
