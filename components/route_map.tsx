'use client'

import { useEffect, useRef } from 'react'

// Strava's club, shown as a link on every map
const STRAVA_CLUB_ID = '1906465'
const EMBED_SCRIPT = 'https://strava-embeds.com/embed.js'

export type StravaRoute = { id: string; token: string; mapHash?: string }

declare global {
  interface Window {
    __STRAVA_EMBED_BOOTSTRAP__?: () => void
  }
}

let scriptPromise: Promise<void> | null = null

// Load Strava's embed script once for the whole page
function loadEmbedScript(): Promise<void> {
  if (window.__STRAVA_EMBED_BOOTSTRAP__) return Promise.resolve()
  if (scriptPromise) return scriptPromise
  scriptPromise = new Promise((resolve, reject) => {
    const s = document.createElement('script')
    s.src = EMBED_SCRIPT
    s.async = true
    s.onload = () => resolve()
    s.onerror = () => {
      scriptPromise = null
      reject(new Error('Strava embed script failed to load'))
    }
    document.body.appendChild(s)
  })
  return scriptPromise
}

// Shows one Strava route map. Strava's script swaps the placeholder for its own iframe,
// so the placeholder is created by hand inside an element React leaves alone.
export default function RouteMap({ route, title }: { route: StravaRoute; title: string }) {
  const box = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = box.current
    if (!el) return
    let cancelled = false

    const ph = document.createElement('div')
    ph.className = 'strava-embed-placeholder'
    ph.dataset.embedType = 'route'
    ph.dataset.embedId = route.id
    ph.dataset.units = 'metric'
    ph.dataset.fullWidth = 'true'
    ph.dataset.style = 'hybrid'
    if (route.mapHash) ph.dataset.mapHash = route.mapHash
    ph.dataset.clubId = STRAVA_CLUB_ID
    ph.dataset.fromEmbed = 'true'
    ph.dataset.token = route.token
    el.replaceChildren(ph)

    loadEmbedScript()
      .then(() => {
        if (!cancelled) window.__STRAVA_EMBED_BOOTSTRAP__?.()
      })
      .catch(() => {
        if (cancelled) return
        el.innerHTML = ''
        const p = document.createElement('p')
        p.className = 'rc-map-error'
        p.textContent = 'The map could not load. '
        const a = document.createElement('a')
        a.href = `https://www.strava.com/routes/${route.id}`
        a.target = '_blank'
        a.rel = 'noopener noreferrer'
        a.textContent = 'View the route on Strava'
        p.appendChild(a)
        el.appendChild(p)
      })

    return () => {
      cancelled = true
      el.replaceChildren()
    }
  }, [route.id, route.token, route.mapHash])

  return <div ref={box} className="rc-map" aria-label={`${title} route map`} />
}
