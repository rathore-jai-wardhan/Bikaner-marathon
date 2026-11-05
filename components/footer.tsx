import Link from 'next/link'

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1.3" fill="currentColor" />
    </svg>
  )
}

// Shown on every page. id="contact" is where the menu's "Contact us" jumps to.
export default function Footer() {
  return (
    <footer id="contact" className="bm-footer">
      <div className="bm-wrap bm-fgrid">
        <div>
          <div className="bm-fbrand">
            <img src="/logo-round.webp" alt="" width={56} height={56} />
            <h4>Bikaner Marathon</h4>
          </div>
          <p className="bm-forg">Organised by Bikaner Run Club</p>
        </div>

        <div>
          <h4>Contact us</h4>
          <a href="mailto:team@bikanerrunclub.in">team@bikanerrunclub.in</a>
          <a href="tel:+919462475332">+91 94624 75332</a>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Behind+Rajasthan+Patrika+Press+Amar+Singh+Pura+Bikaner+334001"
            target="_blank"
            rel="noopener noreferrer"
          >
            Behind Rajasthan Patrika Press, Amar Singh Pura, Bikaner 334001
          </a>
        </div>

        <div>
          <h4>Follow us</h4>
          <a className="bm-social" href="https://www.instagram.com/bikanermarathon/" target="_blank" rel="noopener noreferrer">
            <InstagramIcon />
            <span>Bikaner Marathon</span>
          </a>
          <a className="bm-social" href="https://www.instagram.com/bikanerrunclub/" target="_blank" rel="noopener noreferrer">
            <InstagramIcon />
            <span>Bikaner Run Club</span>
          </a>
        </div>

        <div>
          <h4>Policies</h4>
          <Link href="/terms_and_conditions">Terms and Conditions</Link>
          <Link href="/privacy_policy">Privacy Policy</Link>
          <Link href="/refund_policy">Refund and Cancellation Policy</Link>
        </div>
      </div>
      <div className="bm-copyr">© 2026 Bikaner Marathon. All rights reserved.</div>
    </footer>
  )
}
