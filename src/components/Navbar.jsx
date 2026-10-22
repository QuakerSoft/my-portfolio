function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4 pt-12 px-20 bg-gray-900 text-white">
      <div className="text-2xl font-bold mx-10 font-mono">Devin <span className="text-blue-500 text">Como</span></div>
      <ul className="flex space-x-4">
        <li><a href="#about" className="mx-4 transition-all duration-300 ease-out underline-offset-[20px] hover:underline hover:text-blue-500 text-2xl font-bold font-mono">About</a></li>
        <li><a href="#projects" className="mx-4 transition-all duration-300 ease-out underline-offset-[20px] hover:underline hover:text-blue-500 text-2xl font-bold font-mono">Projects</a></li>
        <li><a href="#skills" className="mx-4 transition-all duration-300 ease-out underline-offset-[20px] hover:underline hover:text-blue-500 text-2xl font-bold font-mono">Skills</a></li>
        <li><a href="#blog" className="mx-4 transition-all duration-300 ease-out underline-offset-[20px] hover:underline hover:text-blue-500 text-2xl font-bold font-mono">Blog</a></li>
        <li><a href="#contact" className="mx-4 transition-all duration-300 ease-out underline-offset-[20px] hover:underline hover:text-blue-500 text-2xl font-bold font-mono">Contact</a></li>
      </ul>
    </nav>
  )
}
export default Navbar
