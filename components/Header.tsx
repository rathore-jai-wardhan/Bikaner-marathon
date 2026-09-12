
export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4" style={{ backgroundColor: 'var(--maroon)' }}>
      <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5">
        <img src="/brc.jpg" alt="BRC" className="h-15 w-15 rounded-full object-cover" />
        <span className="text-white font-bold text-sm">x</span>
        <img src="/bikaner-marathon.jpg" alt="Bikaner Marathon" className="h-15 w-15 rounded-full object-cover" />
      </div>
      <a
          href="#registration"
          className="px-6 py-2 rounded-full font-semibold text-sm"
          style={{ backgroundColor: 'var(--gold)', color: 'var(--charcoal)' }}
        >
         Register Now
        </a>
    </header>
  )
}