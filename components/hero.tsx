import Countdown from './countdown'

export default function Hero() {
  return (
    <section id="registration" className="text-center py-16 px-6" style={{ backgroundColor: 'var(--sand)' }}>
      <img
        src="/marathon poster.png"
        alt="Bikaner Marathon"
        className="max-w-sm mx-auto rounded-lg shadow-lg mb-8"
      />
      <h2 className="text-2xl heading-font mb-2" style={{ color: 'var(--maroon)' }}>
        Registration Opening Soon
      </h2>
      <Countdown />
    </section>
  )
}