const categories = [
  { distance: '5K', name: 'Fun Run' },
  { distance: '10K', name: 'Challenge Run' },
  { distance: '21K', name: 'Half Marathon' },
  { distance: '42K', name: 'Full Marathon' },
]

export default function RaceCategories() {
  return (
    <section className="py-16 px-6 max-w-5xl mx-auto">
      <h2 className="text-3xl heading-font text-center mb-10" style={{ color: 'var(--maroon)' }}>
        Race Categories
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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
          </div>
        ))}
      </div>
    </section>
  )
}