import Countdown from './countdown'

export default function Hero() {
  return (
    <section id="registration" className="text-center py-16 px-6" style={{ backgroundColor: 'var(--sand)' }}>
      <div className="flex justify-center mb-8">
       <img
         src="/marathon poster.png"
         alt="Bikaner Marathon"
         className="w-full max-w-sm rounded-lg shadow-lg"
        />
      </div>
      <h2 className="text-3xl heading-font mb-2" style={{ color: 'var(--maroon)' }}>
        Registration is Live!
      </h2>
      <h3 className="text-xl heading-font mb-3" style={{ color: 'var(--maroon)' }}>
        Time until race day:
      </h3>
      <Countdown />
    </section>
  )
}