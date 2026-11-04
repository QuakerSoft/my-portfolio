import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import About from './sections/About'
import Projects from './sections/Projects'
import Skills from './sections/Skills'
import Contact from './sections/Contact'
import Footer from './components/Footer'
// import StarField from './components/StarField'
import DotGrid from './components/DotGrid'

function App() {
  return (
    <>
      {/* <StarField /> */}
      <DotGrid />
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
    </>
  )
}

export default App
