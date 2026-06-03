import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import { experience } from '../data/content'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'

export default function Experience() {
  const root = useRef(null)
  const line = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        line.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top 65%',
            end: 'bottom 75%',
            scrub: true,
          },
        }
      )
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section id="experience" className="relative mx-auto max-w-6xl px-5 py-28 sm:px-6 sm:py-36">
      <SectionHeading index="04" eyebrow="Experience" title="A track record of shipping." />

      <div ref={root} className="relative mt-16 pl-10 sm:pl-14">
        {/* Rail */}
        <div className="absolute left-1 top-3 h-[calc(100%-1.5rem)] w-px bg-ink/12" />
        <div
          ref={line}
          className="absolute left-1 top-3 h-[calc(100%-1.5rem)] w-px origin-top bg-red"
        />

        <div className="flex flex-col gap-6">
          {experience.map((job, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className="group relative">
                {/* Dot on the rail */}
                <span className="absolute -left-[2.45rem] top-6 flex h-3.5 w-3.5 items-center justify-center sm:-left-[3.45rem]">
                  <span className="h-3.5 w-3.5 rounded-full border-2 border-red bg-sand transition-colors duration-300 group-hover:bg-red" />
                </span>

                <div className="rounded-3xl border border-ink/10 bg-paper p-6 transition-colors duration-300 group-hover:bg-white sm:p-8">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                    <div>
                      <h3 className="text-2xl font-semibold tracking-tight text-ink">{job.role}</h3>
                      <p className="mt-1 text-lg font-medium text-red">{job.company}</p>
                    </div>
                    <div className="mt-2 shrink-0 text-sm text-gray-2 sm:mt-0 sm:text-right">
                      <p className="font-medium">{job.duration}</p>
                      <p>{job.location}</p>
                    </div>
                  </div>

                  <ul className="mt-5 grid gap-2.5 sm:grid-cols-1">
                    {job.highlights.map((h, hi) => (
                      <li key={hi} className="flex gap-3 text-gray-1">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-red/70" />
                        <span className="leading-relaxed">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
