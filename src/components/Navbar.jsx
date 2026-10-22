function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4 bg-gray-900 text-white">
      <div className="text-xl font-bold mx-4">Devin <span className="text-blue-500">Como</span></div>
      <ul className="flex space-x-4">
        <li><a href="#about" className="mx-4 transition-all duration-300 ease-out underline-offset-[10px] hover:underline hover:text-blue-500">About</a></li>
        <li><a href="#projects" className="mx-4 transition-all duration-300 ease-out underline-offset-[10px] hover:underline hover:text-blue-500">Projects</a></li>
        <li><a href="#skills" className="mx-4 transition-all duration-300 ease-out underline-offset-[10px] hover:underline hover:text-blue-500">Skills</a></li>
        <li><a href="#blog" className="mx-4 transition-all duration-300 ease-out underline-offset-[10px] hover:underline hover:text-blue-500">Blog</a></li>
        <li><a href="#contact" className="mx-4 transition-all duration-300 ease-out underline-offset-[10px] hover:underline hover:text-blue-500">Contact</a></li>
      </ul>
    </nav>
  )
}
export default Navbar
