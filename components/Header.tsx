import Link from 'next/link'

// Height of the Laxmi Niwas Palace logo in the tab, in pixels.
const VENUE_LOGO_HEIGHT = 28

export default function Header() {
  return (
    <header
      className="relative z-10 flex items-center justify-between px-6 py-4"
      style={{ backgroundColor: 'var(--maroon)' }}
    >
      <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5">
        <img src="/brc.jpg" alt="BRC" className="h-15 w-15 rounded-full object-cover" />
        <span className="text-white font-bold text-sm">x</span>
        <img src="/bikaner-marathon.jpg" alt="Bikaner Marathon" className="h-15 w-15 rounded-full object-cover" />
      </div>

      <Link
        href="/register"
        target="_blank"
        rel="noopener noreferrer"
        className="px-6 py-2 rounded-full font-semibold text-sm"
        style={{ backgroundColor: 'var(--gold)', color: 'var(--charcoal)' }}
      >
        Register Now
      </Link>

            {/* Venue partner tab: hangs from the centre of the header.
          inset-x-0 + mx-auto + w-fit centres it using the full width, so it never
          gets squeezed; on phones it stacks into two lines. */}
      <div
        className="absolute inset-x-0 top-full mx-auto flex w-fit max-w-[calc(100%-1.5rem)] flex-col items-center gap-0.5 rounded-b-2xl px-4 pb-2 pt-1.5 text-center shadow-md sm:flex-row sm:gap-2 sm:px-5"
        style={{ backgroundColor: 'var(--maroon)' }}
      >
        <span className="text-xs text-white/85 sm:text-sm">Venue Partner:</span>
        <a
          href="https://www.laxminiwaspalace.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="The Laxmi Niwas Palace website (opens in a new tab)"
          className="group flex items-center gap-2"
        >
          <span className="heading-font text-xs font-bold text-white transition-colors group-hover:text-[var(--gold)] group-active:text-[var(--gold)] sm:text-sm">
            The Laxmi Niwas Palace
          </span>
          <img
            src="/partners/laxmi-niwas-palace.jpeg"
            alt=""
            className="shrink-0"
            style={{
              height: VENUE_LOGO_HEIGHT,
              width: 'auto',
              maxWidth: 'none',
              borderRadius: 4,
              border: '1px solid var(--gold)',
            }}
          />
        </a>
      </div>
    </header>
  )
}