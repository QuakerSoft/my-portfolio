const links = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

function Navbar() {
  return (
    <header className="sticky top-4 z-50 mt-4 px-4">
      <nav className="mx-auto flex max-w-3xl xl:max-w-5xl items-center justify-between rounded-full border border-white/10 bg-black/70 shadow-[0_0_24px_rgba(59,130,246,0.2)] px-4 py-3 text-white sm:px-6 xl:px-8 xl:py-4 backdrop-blur-md">
        <a href="#" className="whitespace-nowrap font-mono text-sm font-bold sm:text-base xl:text-lg">Devin <span className="text-blue-500">Como</span></a>
        <ul className="flex gap-3 sm:gap-6">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="font-mono text-xs text-slate-300 sm:text-sm xl:text-base transition-colors duration-300 hover:text-blue-500">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
export default Navbar
