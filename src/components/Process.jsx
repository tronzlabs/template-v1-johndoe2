import { useLayoutEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { processSteps } from '../data/content'

export default function Process() {
  const root = useRef(null)
  const track = useRef(null)

  useLayoutEffect(() => {
    const mm = gsap.matchMedia()

    // Desktop / tablet: pin + horizontal scroll
    mm.add('(min-width: 768px)', () => {
      const panels = gsap.utils.toArray('[data-panel]', track.current)
      const getScrollAmount = () => track.current.scrollWidth - window.innerWidth

      const tween = gsap.to(track.current, {
        x: () => -getScrollAmount(),
        ease: 'none',
      })

      ScrollTrigger.create({
        trigger: root.current,
        start: 'top top',
        end: () => `+=${getScrollAmount()}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        animation: tween,
      })

      // subtle parallax on panel numbers
      panels.forEach((p) => {
        const num = p.querySelector('[data-num]')
        if (!num) return
        gsap.fromTo(
          num,
          { xPercent: 12 },
          {
            xPercent: -12,
            ease: 'none',
            scrollTrigger: {
              trigger: p,
              containerAnimation: tween,
              start: 'left right',
              end: 'right left',
              scrub: true,
            },
          }
        )
      })
    })

    return () => mm.revert()
  }, [])

  return (
    <section
      id="process"
      ref={root}
      className="relative overflow-hidden bg-ink py-20 text-sand md:h-screen md:py-0"
    >
      {/* Header */}
      <div className="px-5 pb-10 pt-10 sm:px-6 md:absolute md:left-6 md:top-10 md:z-10 md:pb-0 md:pt-16">
        <div className="flex items-center gap-3">
          <span className="h-1.5 w-1.5 rounded-full bg-red" />
          <span className="text-xs font-medium uppercase tracking-[0.25em] text-sand/60">
            05 — Process
          </span>
        </div>
        <h2 className="mt-4 max-w-md text-4xl font-semibold leading-[0.95] tracking-tight sm:text-5xl">
          How great work <span className="text-red">gets made.</span>
        </h2>
      </div>

      {/* Horizontal track */}
      <div
        ref={track}
        className="flex flex-col gap-6 px-5 sm:px-6 md:h-full md:flex-row md:items-center md:gap-0 md:px-0 md:pl-[34vw]"
      >
        {processSteps.map((step) => (
          <div
            key={step.no}
            data-panel
            className="relative flex shrink-0 flex-col justify-center md:h-full md:w-[40vw] md:px-12"
          >
            <div className="relative overflow-hidden rounded-3xl border border-sand/10 bg-ink-2/60 p-8 backdrop-blur-sm md:border-0 md:bg-transparent md:p-0">
              <span
                data-num
                className="block text-[7rem] font-semibold leading-none tracking-tight text-sand/10 md:text-[12rem]"
              >
                {step.no}
              </span>
              <h3 className="mt-2 text-3xl font-semibold tracking-tight text-sand md:text-5xl">
                {step.title}
              </h3>
              <p className="mt-5 max-w-sm leading-relaxed text-sand/60">{step.text}</p>
              <ul className="mt-7 flex flex-wrap gap-2.5">
                {step.points.map((p) => (
                  <li
                    key={p}
                    className="rounded-full border border-sand/15 px-3.5 py-1.5 text-sm text-sand/80"
                  >
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
