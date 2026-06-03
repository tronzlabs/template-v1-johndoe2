import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { testimonials } from '../data/content'
import SectionHeading from './ui/SectionHeading'

export default function Testimonials() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  const go = useCallback((dir) => {
    setIndex((i) => (i + dir + testimonials.length) % testimonials.length)
  }, [])

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => go(1), 5000)
    return () => clearInterval(id)
  }, [paused, go])

  const active = testimonials[index]

  return (
    <section className="relative overflow-hidden py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionHeading
          index="06"
          eyebrow="Testimonials"
          title="Trusted by the people I build with."
          align="center"
        />

        <div
          className="relative mx-auto mt-16 max-w-3xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* big quote mark */}
          <span className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 font-display text-[14rem] leading-none text-red/10">
            &ldquo;
          </span>

          <div className="relative min-h-[260px] sm:min-h-[220px]">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={index}
                initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -24, filter: 'blur(6px)' }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="text-center"
              >
                <p className="text-balance text-2xl font-medium leading-snug tracking-tight text-ink sm:text-3xl">
                  {active.quote}
                </p>
                <footer className="mt-8 flex items-center justify-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-sm font-semibold text-sand">
                    {active.name.split(' ').map((n) => n[0]).join('')}
                  </span>
                  <span className="text-left">
                    <span className="block text-sm font-semibold text-ink">{active.name}</span>
                    <span className="block text-sm text-gray-1">{active.title}</span>
                  </span>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          {/* controls */}
          <div className="mt-10 flex items-center justify-center gap-5">
            <button
              onClick={() => go(-1)}
              data-cursor="hover"
              aria-label="Previous testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:border-red hover:text-red"
            >
              ←
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className="group/dot p-1"
                >
                  <span
                    className={`block h-1.5 rounded-full transition-all duration-300 ${
                      i === index ? 'w-7 bg-red' : 'w-1.5 bg-ink/25 group-hover/dot:bg-ink/50'
                    }`}
                  />
                </button>
              ))}
            </div>
            <button
              onClick={() => go(1)}
              data-cursor="hover"
              aria-label="Next testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:border-red hover:text-red"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
