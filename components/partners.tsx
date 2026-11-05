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
    <section className="bm-band">
      <div className="bm-wrap bm-center">
        <div className="bm-eyebrow">Supported by</div>
        <h2 className="bm-h2">Our Partners</h2>
        <div className="bm-partners">
          {partners.map((p) => (
            <figure key={p.name} className="bm-partner">
              <div className="bm-pcircle">
                <img src={p.logo} alt={p.name} loading="lazy" />
              </div>
              <figcaption>{p.name}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
