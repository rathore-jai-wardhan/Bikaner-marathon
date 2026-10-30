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
      </div>
    </section>
  )
}