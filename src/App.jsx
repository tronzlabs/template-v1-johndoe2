import { useSmoothScroll } from './hooks/useSmoothScroll'
import Cursor from './components/ui/Cursor'
import ScrollProgress from './components/ui/ScrollProgress'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import TechStack from './components/TechStack'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Process from './components/Process'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import StartProjectOverlay from './components/StartProjectOverlay'

export default function App() {
  useSmoothScroll()

  return (
    <>
      <div className="grain" aria-hidden="true" />
      <Cursor />
      <ScrollProgress />
      <Navbar />

      <main>
        <Hero />
        <About />
        <TechStack />
        <Projects />
        <Experience />
        <Process />
        <Testimonials />
        <Contact />
      </main>

      <Footer />
      <StartProjectOverlay />
    </>
  )
}
