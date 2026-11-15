function Hero(){
    return (
        <section className="flex flex-col items-center justify-center min-h-screen p-8 text-white">
            <h1 className="text-4xl md:text-6xl xl:text-7xl font-bold mb-4 md:mb-6 text-center">Hi..I'm Devin <span className="text-blue-500">Como</span></h1>
            <p className="text-xl md:text-2xl mb-6 md:mb-10">Software Developer</p>
            <a href="#contact" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 md:py-3 md:px-6 md:text-lg rounded">
                Contact Me
            </a>
            <a href="#projects" className="bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 md:py-3 md:px-6 md:text-lg rounded mt-4">
                View Projects
            </a>
        </section>
    )
}

export default Hero
