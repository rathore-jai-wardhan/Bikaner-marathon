'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

// Menu entries. "Contact us" jumps to the footer, which is on every page.
// Links starting with http open in a new tab.
const links = [
  { href: '/', label: 'Home' },
  { href: '/race-categories', label: 'Race Categories' },
  { href: 'https://www.tourism.rajasthan.gov.in/bikaner.html', label: 'Explore Bikaner' },
  { href: '#contact', label: 'Contact us' },
]

export default function SiteHeader() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  // Close the menu whenever the page changes
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // While the menu is open: stop the page behind it scrolling, and close on Esc
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open])

  return (
    <div className={open ? 'bm-menu-open' : undefined}>
      <header className="bm-header">
        <Link href="/" className="bm-brand" aria-label="Bikaner Marathon home">
          <img src="/logo-round.webp" alt="Bikaner Marathon" width={60} height={60} />
        </Link>
        <div className="bm-hdr-actions">
          <Link href="/register" target="_blank" rel="noopener noreferrer" className="bm-btn-register">
            Register now
          </Link>
          <button
            type="button"
            className="bm-btn-menu"
            aria-expanded={open}
            aria-controls="bm-drawer"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="bm-burger" aria-hidden="true"><i></i><i></i><i></i></span>
            <span className="bm-lbl">Menu</span>
          </button>
        </div>
      </header>

      <div className="bm-scrim" onClick={() => setOpen(false)} />
      <aside className="bm-drawer" id="bm-drawer" aria-label="Menu">
        <div className="bm-drawer-top">
          <span>MENU</span>
          <button type="button" className="bm-x" aria-label="Close menu" onClick={() => setOpen(false)}>
            ×
          </button>
        </div>
        <nav>
          {links.map((l) =>
            l.href.startsWith('#') ? (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </a>
            ) : l.href.startsWith('http') ? (
              <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>
                {l.label}
              </a>
            ) : (
              <Link
                key={l.href}
                href={l.href}
                aria-current={pathname === l.href ? 'page' : undefined}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            )
          )}
        </nav>
        <Link href="/register" target="_blank" rel="noopener noreferrer" className="bm-btn-register">
          Register now
        </Link>
      </aside>
    </div>
  )
}
