export default function Footer() {
  return (
    <footer className="py-10 px-6 text-center" style={{ backgroundColor: 'var(--maroon)', color: 'white' }}>
      <div className="flex flex-col md:flex-row justify-center gap-8">
        <a href="https://www.instagram.com/bikanerrunclub/?hl=en" target="_blank" className="hover:text-[var(--gold)]">
          BRC page
        </a>
        <a href="https://www.instagram.com/bikanermarathon/" target="_blank" className="hover:text-[var(--gold)]">
          Bikaner Marathon page
        </a>
        <span>To become a sponsor, contact: +91 9462475332</span>
      </div>
    </footer>
  )
}