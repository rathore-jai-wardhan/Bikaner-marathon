import Countdown from './countdown'

export default function Hero() {
  return (
    <section id="registration" className="text-center py-16 px-6" style={{ backgroundColor: 'var(--sand)' }}>
      <div className="flex justify-center mb-8">
       <img
         src="/marathon-poster.jpg"
         alt="Bikaner Marathon"
         className="w-full max-w-sm rounded-lg shadow-lg"
        />
      </div>
      <h2 className="text-2xl heading-font mb-2" style={{ color: 'var(--maroon)' }}>
        Registration Opening Soon
      </h2>
      <Countdown />
    </section>
  )
}