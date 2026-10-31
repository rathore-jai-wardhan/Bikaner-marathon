const categories = [
  { distance: '2K', name: 'Fun Run', price: '₹ 149' },
  { distance: '5K', name: 'Run', price: '₹ 299' },
  { distance: '10K', name: 'Challenge Run', price: '₹ 399' },
  { distance: '21K', name: 'Half Marathon', price: '₹ 499' },
]

export default function RaceCategories() {
  return (
    <section className="py-16 px-6 max-w-5xl mx-auto">
      <h2 className="text-3xl heading-font text-center mb-10" style={{ color: 'var(--maroon)' }}>
        Race Categories
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.distance}
            className="rounded-xl p-6 text-center"
            style={{ backgroundColor: 'var(--ivory)', border: '1px solid var(--sand)' }}
          >
            <div className="text-3xl font-bold" style={{ color: 'var(--gold)' }}>
              {cat.distance}
            </div>
            <div className="mt-2 text-sm" style={{ color: 'var(--charcoal)' }}>
              {cat.name}
            </div>
            <div className="mt-4 text-xl font-bold" style={{ color: 'var(--maroon)' }}>
              {cat.price}
            </div>
          </div>
        ))}

        {/* Premium Registration: a gold ticket. Spans the full row on phones, 2 of 3 columns on larger screens. */}
        <div
          className="relative col-span-2 overflow-hidden rounded-xl px-8 py-7 text-center shadow-lg"
          style={{
            background:
              'linear-gradient(135deg, #8a6a12 0%, #d9a62e 22%, #f7e08b 45%, #d9a62e 62%, #a8801c 82%, #f2d675 100%)',
            border: '2px solid #b8891f',
            boxShadow: '0 10px 25px -8px rgba(122, 23, 61, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
          }}
        >
          {/* Ticket notches on the left and right edges */}
          <span
            aria-hidden
            className="absolute left-0 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ backgroundColor: 'var(--ivory)', boxShadow: 'inset -2px 0 0 #b8891f' }}
          />
          <span
            aria-hidden
            className="absolute right-0 top-1/2 h-8 w-8 translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ backgroundColor: 'var(--ivory)', boxShadow: 'inset 2px 0 0 #b8891f' }}
          />

          {/* Inner dashed border, like a printed ticket */}
          <div
            className="rounded-lg px-4 py-5"
            style={{ border: '1.5px dashed rgba(122, 23, 61, 0.45)' }}
          >
            <div className="text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: 'var(--maroon)' }}>
              ★ Exclusive ★
            </div>
            <div
              className="mt-2 text-2xl md:text-3xl font-bold heading-font"
              style={{ color: 'var(--maroon)', textShadow: '0 1px 0 rgba(255, 255, 255, 0.5)' }}
            >
              Premium Registration
            </div>
            <div className="mt-2 text-sm md:text-base font-semibold" style={{ color: 'var(--charcoal)' }}>
              Opening soon
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}