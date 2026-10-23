
export default function Footer() {
  return (
    <footer
      className="py-8 sm:py-10 px-5 sm:px-6 text-center"
      style={{
        backgroundColor: "var(--maroon)",
        color: "white",
      }}
    >
      <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-6 md:gap-10">

        {/* Existing Instagram links */}
        <a
          href="https://www.instagram.com/bikanerrunclub/?hl=en"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[var(--gold)] transition-colors"
        >
          BRC page
        </a>

        <a
          href="https://www.instagram.com/bikanermarathon/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[var(--gold)] transition-colors"
        >
          Bikaner Marathon page
        </a>

        {/* Existing sponsor contact */}
        <span className="max-w-xs leading-relaxed">
          To become a sponsor, contact:{" "}
          <a
            href="tel:+919462475332"
            className="hover:text-[var(--gold)] transition-colors"
          >
            +91 9462475332
          </a>
        </span>

        {/* New Legal section */}
        <div className="flex flex-col items-center gap-2">
          <h3 className="font-semibold text-[var(--gold)]">
            Legal
          </h3>

          <a
            href="/privacy_policy"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--gold)] transition-colors"
          >
            Privacy Policy
          </a>

          <a
            href="/refund_policy"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--gold)] transition-colors"
          >
            Refund & Cancellation Policy
          </a>

          <a
            href="/terms_and_conditions"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--gold)] transition-colors"
          >
            Terms & Conditions
          </a>
        </div>

      </div>

      <div className="mt-7 pt-4 border-t border-white/20 text-xs sm:text-sm opacity-80">
        © 2026 Bikaner Marathon. All rights reserved.
      </div>
    </footer>
  );
}
