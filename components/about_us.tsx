// "About the race" section on the home page.
// The photo fills the right half of the section and fades into the text.
// To change it: put the new photo in public/about/ and update PHOTO below.
const PHOTO: string | null = '/about/brc-group.webp'

export default function AboutUs() {
  return (
    <section className="bm-about-sec">
      {/* Fades into the text: right to left on laptops, top to bottom on phones (see .bm-photo in globals.css) */}
      <div className="bm-photo">
        {PHOTO ? (
          <img src={PHOTO} alt="Bikaner Run Club runners celebrating together" loading="lazy" />
        ) : (
          <div className="bm-photo-placeholder">Photo from a Bikaner Run Club event (to be added)</div>
        )}
      </div>

      <div className="bm-wrap bm-about">
        <div className="bm-about-text">
          <div className="bm-eyebrow">The inaugural edition</div>
          <h2 className="bm-h2">Bikaner Marathon 2026</h2>
          <p className="bm-lead">
            This December, Bikaner runs for the first time. The inaugural Bikaner Marathon is more than a race: it&apos;s
            the start of an unstoppable movement, an undying fire of resilience lit by every runner who shows up, pushes
            through and crosses the finish line.
          </p>
          <p className="bm-lead">
            Experience Bikaner&apos;s heritage on foot, past the forts, havelis and old-city streets that define this
            desert city, cheered on by the warmth its people are known for. Bikaner&apos;s famous hospitality, in a new
            form: out on the road, for every runner who comes to run with us.
          </p>
          <div className="bm-cats-label">Race categories</div>
          <div className="bm-chips">
            <span>2K</span>
            <span>5K</span>
            <span>10K</span>
            <span>21K</span>
          </div>
        </div>
      </div>
    </section>
  )
}
