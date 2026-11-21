const links = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

function Navbar() {
  return (
    <header className="sticky top-4 z-50 mt-4 px-4">
      <nav className="mx-auto flex max-w-3xl xl:max-w-5xl items-center justify-between rounded-full border border-white/10 bg-black/70 shadow-[0_0_24px_rgba(59,130,246,0.2)] px-3 py-3 text-white sm:px-6 xl:px-8 xl:py-4 backdrop-blur-md">
        {/* full name on bigger screens, initials on phones so the Resume button fits */}
        <a href="#" aria-label="Devin Como, back to top" className="whitespace-nowrap font-mono text-sm font-bold sm:text-base xl:text-lg">
          <span className="hidden sm:inline">Devin <span className="text-blue-500">Como</span></span>
          <span className="sm:hidden">D<span className="text-blue-500">C</span></span>
        </a>
        <div className="flex items-center gap-2.5 sm:gap-6">
          <ul className="flex gap-2.5 sm:gap-6">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="font-mono text-xs text-slate-300 sm:text-sm xl:text-base transition-colors duration-300 hover:text-blue-500">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* resume opens in a new tab; put the file at public/resume.pdf */}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1 whitespace-nowrap rounded-full border border-blue-500/50 px-2.5 py-1 sm:px-3 font-mono text-xs text-blue-400 transition-colors duration-300 hover:border-blue-500 hover:bg-blue-500/10 hover:text-white sm:text-sm xl:px-4 xl:text-base"
          >
            Resume
            <span aria-hidden="true" className="hidden transition-transform duration-300 sm:inline group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
          </a>
        </div>
      </nav>
    </header>
  )
}
export default Navbar
