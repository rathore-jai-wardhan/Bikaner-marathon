// Partner logos, shown in circles. Logo files live in public/partners/.
// To add, remove or reorder a partner, edit this list.
const partners = [
  { name: 'Bikaner Development Authority', logo: '/partners/bda.jpeg' },
  { name: 'Bikaner Police', logo: '/partners/police.png' },
  { name: 'Bikaner Tourism', logo: '/partners/tourism.jpeg' },
  { name: 'Bikaner Forest Department', logo: '/partners/forest.jpeg' },
  { name: 'Bikaner Nagar Nigam', logo: '/partners/nagar-nigam.jpg' },
]

export default function Partners() {
  return (
    <section className="py-12 px-6 max-w-5xl mx-auto">
      <h2 className="text-3xl heading-font text-center mb-10" style={{ color: 'var(--maroon)' }}>
        Our Partners
      </h2>
      <div className="flex flex-wrap justify-center gap-x-8 gap-y-8">
        {partners.map((p) => (
          <div key={p.name} className="flex w-28 flex-col items-center text-center sm:w-32">
            {/* White circle; the padding keeps square and rectangular logos fully inside the circle */}
            <div
              className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-white p-[15%] shadow-md sm:h-28 sm:w-28"
              style={{ border: '2px solid var(--gold)' }}
            >
              <img src={p.logo} alt={p.name} className="h-full w-full object-contain" />
            </div>
            <div className="mt-3 text-xs font-semibold leading-snug sm:text-sm" style={{ color: 'var(--charcoal)' }}>
              {p.name}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}