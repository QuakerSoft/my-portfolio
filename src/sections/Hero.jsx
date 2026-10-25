function Hero(){
    return (
        <section className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-900 text-white">
            <h1 className="text-4xl font-bold mb-4">Hi..I'm Devin <span className="text-blue-500">Como</span></h1>
            <p className="text-xl mb-6">Backend Developer</p>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ">
                Contact Me
            </button>
            <button className="bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded mt-4">
                View Projects
            </button>
        </section>
    )
}

export default Hero