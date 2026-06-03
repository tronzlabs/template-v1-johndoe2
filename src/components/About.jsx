import { useEffect, useRef, useState } from 'react'
import { useInView, motion } from 'framer-motion'
import { metrics, profile } from '../data/content'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'

function Counter({ value, suffix }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    let raf
    const duration = 1400
    const start = performance.now()
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setDisplay(Math.round(eased * value))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value])

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  )
}

export default function About() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-5 py-28 sm:px-6 sm:py-36">
      <div className="grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading index="01" eyebrow="About" title="Engineering with a designer's eye." />
        </div>

        <div className="lg:col-span-7">
          <Reveal>
            <p className="text-2xl font-medium leading-snug tracking-tight text-ink sm:text-3xl">
              I help teams turn ambitious ideas into products that feel{' '}
              <span className="text-red">effortless</span> — sweating the details most people
              never notice, because that's exactly what people feel.
            </p>
          </Reveal>

          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            <Reveal delay={0.05}>
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-gray-2">
                Approach
              </h3>
              <p className="leading-relaxed text-gray-1">
                Start from the problem, prototype quickly, and obsess over the experience.
                I bridge design and engineering so nothing gets lost in translation.
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-gray-2">
                Product thinking
              </h3>
              <p className="leading-relaxed text-gray-1">
                I think in outcomes, not tickets — questioning scope, simplifying flows,
                and shipping the smallest thing that delivers real value.
              </p>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-ink/10 bg-ink/10 lg:grid-cols-4">
        {metrics.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="group relative bg-paper p-7 transition-colors duration-300 hover:bg-white sm:p-9"
          >
            <div className="text-5xl font-semibold tracking-tight text-ink sm:text-6xl">
              <Counter value={m.value} suffix={m.suffix} />
            </div>
            <div className="mt-3 text-sm leading-snug text-gray-1">{m.label}</div>
            <span className="absolute left-0 top-0 h-full w-1 origin-top scale-y-0 bg-red transition-transform duration-300 group-hover:scale-y-100" />
          </motion.div>
        ))}
      </div>

      <Reveal delay={0.1}>
        <p className="mt-10 text-sm text-gray-2">
          Based in {profile.location.split('—')[0].trim()} · Collaborating with teams worldwide
        </p>
      </Reveal>
    </section>
  )
}
