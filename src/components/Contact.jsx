import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import { profile } from '../data/content'
import TextReveal from './ui/TextReveal'
import MagneticButton from './ui/MagneticButton'
import Reveal from './ui/Reveal'

const links = [
  { label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  { label: 'LinkedIn', value: '/in/johndoe', href: profile.socials.linkedin },
  { label: 'GitHub', value: '@johndoe', href: profile.socials.github },
  { label: 'Resume', value: 'Download PDF', href: profile.socials.resume },
]

export default function Contact() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return
    const ctx = gsap.context(() => {
      gsap.to('[data-blob]', {
        scale: 1.15,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section id="contact" ref={root} className="relative overflow-hidden px-5 py-28 sm:px-6 sm:py-36">
      {/* glow */}
      <div data-blob className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[70vh] w-[70vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red/15 blur-[120px]" />

      <div className="mx-auto max-w-5xl text-center">
        <Reveal>
          <div className="flex items-center justify-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-red" />
            <span className="text-xs font-medium uppercase tracking-[0.25em] text-gray-1">
              07 — Contact
            </span>
          </div>
        </Reveal>

        <TextReveal
          as="h2"
          split="words"
          className="mt-6 text-[clamp(2.75rem,8vw,7rem)] font-semibold leading-[0.92] tracking-[-0.04em] text-ink"
        >
          Let's build something meaningful.
        </TextReveal>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-8 max-w-xl text-balance text-lg leading-relaxed text-gray-1">
            Have an idea, a product to refine, or a team to strengthen? I'm currently taking on a
            few new projects for 2026.
          </p>
        </Reveal>

        <Reveal delay={0.18}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <MagneticButton href={`mailto:${profile.email}`} variant="primary" strength={0.5}>
              Start a project
              <span aria-hidden>↗</span>
            </MagneticButton>
            <MagneticButton href={profile.socials.resume} variant="ghost">
              Download résumé
            </MagneticButton>
          </div>
        </Reveal>
      </div>

      {/* Link grid */}
      <div className="mx-auto mt-20 grid max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-3xl border border-ink/10 bg-ink/10 sm:grid-cols-4">
        {links.map((l, i) => (
          <Reveal key={l.label} delay={i * 0.06}>
            <a
              href={l.href}
              target={l.href.startsWith('mailto') ? undefined : '_blank'}
              rel="noreferrer"
              data-cursor="hover"
              className="group flex h-full flex-col gap-2 bg-paper p-6 transition-colors duration-300 hover:bg-white"
            >
              <span className="text-xs font-medium uppercase tracking-wider text-gray-2">
                {l.label}
              </span>
              <span className="flex items-center gap-1.5 text-base font-medium text-ink">
                {l.value}
                <span className="translate-y-1 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  ↗
                </span>
              </span>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
