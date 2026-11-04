const categories = [
  { distance: '2K', name: 'Fun Run', price: '₹ 149' },
  { distance: '5K', name: 'Run', price: '₹ 299' },
  { distance: '10K', name: 'Challenge Run', price: '₹ 399' },
  { distance: '21K', name: 'Half Marathon', price: '₹ 499' },
]

// What each category includes. true = green tick, false = red cross.
// To change what a category gets, edit this list only.
const benefitColumns = ['T-shirt', 'BIB', 'Medal', 'Refreshments', 'Prize eligible']
const benefits = [
  { category: '2K Fun Run', values: [true, false, false, false, false] },
  { category: '5K Run', values: [true, true, true, true, true] },
  { category: '10K Challenge Run', values: [true, true, true, true, true] },
  { category: '21K Half Marathon', values: [true, true, true, true, true] },
]

function Tick() {
  return (
    <svg viewBox="0 0 24 24" className="mx-auto h-5 w-5 sm:h-6 sm:w-6" role="img" aria-label="Included">
      <circle cx="12" cy="12" r="11" fill="#16a34a" />
      <path d="M7 12.5l3.2 3.2L17 9" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Cross() {
  return (
    <svg viewBox="0 0 24 24" className="mx-auto h-5 w-5 sm:h-6 sm:w-6" role="img" aria-label="Not included">
      <circle cx="12" cy="12" r="11" fill="#dc2626" />
      <path d="M8.5 8.5l7 7M15.5 8.5l-7 7" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  )
}

function WhatsIncluded() {
  return (
    <div className="mt-12">
      <h3 className="text-2xl heading-font text-center mb-6" style={{ color: 'var(--maroon)' }}>
        What&apos;s Included
      </h3>
      {/* Scrolls sideways on very narrow phones instead of squashing the columns */}
      <div className="overflow-x-auto rounded-xl" style={{ border: '1px solid var(--sand)' }}>
        <table className="w-full min-w-[520px] border-collapse text-center text-sm sm:text-base">
          <thead>
            <tr style={{ backgroundColor: 'var(--maroon)', color: 'var(--white)' }}>
              <th scope="col" className="px-3 py-3 text-left font-semibold">Category</th>
              {benefitColumns.map((col) => (
                <th key={col} scope="col" className="px-2 py-3 font-semibold">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {benefits.map((row, i) => (
              <tr
                key={row.category}
                style={{ backgroundColor: i % 2 === 0 ? 'var(--ivory)' : 'var(--white)' }}
              >
                <th scope="row" className="px-3 py-3 text-left font-semibold" style={{ color: 'var(--charcoal)' }}>
                  {row.category}
                </th>
                {row.values.map((included, j) => (
                  <td key={benefitColumns[j]} className="px-2 py-3">
                    {included ? <Tick /> : <Cross />}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-center text-xs sm:text-sm" style={{ color: 'var(--charcoal)' }}>
        Medals are awarded to finishers within the cut-off time. Prizes are for top finishers in each category.
        Breakfast is not provided for any category.
      </p>
    </div>
  )
}

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
      <WhatsIncluded />
    </section>
  )
}