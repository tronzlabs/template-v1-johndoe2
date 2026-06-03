import { useLayoutEffect, useRef, useCallback } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap'
import Reveal from './ui/Reveal'

export default function ProjectCard({ project, index }) {
  const root = useRef(null)
  const imgWrap = useRef(null)
  const media = useRef(null)
  const flipped = index % 2 === 1

  const refreshScroll = useCallback(() => {
    ScrollTrigger.refresh()
  }, [])

  useLayoutEffect(() => {
    const wrap = imgWrap.current
    const layer = media.current
    if (!wrap || !layer) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(wrap, { clipPath: 'inset(0% 0% 0% 0%)' })
        gsap.set(layer, { scale: 1, yPercent: 0 })
        return
      }

      // Mask reveal on the frame; scale/parallax on the media layer (not the img)
      gsap.set(wrap, { clipPath: 'inset(0% 0% 100% 0%)' })
      gsap.set(layer, { scale: 1.12, transformOrigin: 'center center' })

      const tl = gsap.timeline({
        scrollTrigger: { trigger: wrap, start: 'top 85%', once: true },
      })
      tl.to(wrap, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.1, ease: 'expo.out' })
        .to(layer, { scale: 1, duration: 1.4, ease: 'expo.out' }, '<')

      gsap.to(layer, {
        yPercent: 6,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <article
      ref={root}
      className="group grid items-center gap-8 lg:grid-cols-12 lg:gap-12"
    >
      {/* Image */}
      <a
        href={project.live}
        data-cursor="hover"
        className={`relative block lg:col-span-7 ${flipped ? 'lg:order-2' : ''}`}
      >
        <div
          ref={imgWrap}
          className="relative aspect-[16/11] overflow-hidden rounded-3xl border border-ink/10 bg-ink/5"
        >
          {/* Taller layer so parallax + scale never expose empty edges */}
          <div
            ref={media}
            className="absolute inset-x-0 top-[-8%] h-[116%] w-full will-change-transform"
          >
            <img
              src={project.image}
              alt={project.title}
              loading="lazy"
              decoding="async"
              onLoad={refreshScroll}
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-ink/30 opacity-0 backdrop-blur-[2px] transition-opacity duration-500 group-hover:opacity-100">
            <span className="flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-ink">
              View case study <span aria-hidden>↗</span>
            </span>
          </div>

          {/* Year chip */}
          <span className="absolute left-4 top-4 z-10 rounded-full bg-paper/80 px-3 py-1 text-xs font-medium text-ink backdrop-blur">
            {project.year}
          </span>
        </div>
      </a>

      {/* Content */}
      <div className={`lg:col-span-5 ${flipped ? 'lg:order-1' : ''}`}>
        <Reveal>
          <div className="flex items-center gap-3 text-sm text-gray-2">
            <span className="font-mono text-red">{project.id}</span>
            <span className="h-px w-8 bg-ink/20" />
            <span>{project.role}</span>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <h3 className="mt-4 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            {project.title}
          </h3>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-1 text-lg font-medium text-gray-1">{project.subtitle}</p>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mt-5 max-w-md leading-relaxed text-gray-1">{project.description}</p>
        </Reveal>

        <Reveal delay={0.2}>
          <ul className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <li
                key={t}
                className="rounded-full border border-ink/12 bg-white/50 px-3 py-1 text-xs font-medium text-ink-2"
              >
                {t}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.25}>
          <div className="mt-8 flex items-center gap-6">
            <a
              href={project.live}
              data-cursor="hover"
              className="group/link inline-flex items-center gap-2 text-sm font-medium text-ink"
            >
              <span className="relative">
                Live demo
                <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-red transition-transform duration-300 group-hover/link:scale-x-100" />
              </span>
              <span aria-hidden>↗</span>
            </a>
            <a
              href={project.github}
              data-cursor="hover"
              className="group/link inline-flex items-center gap-2 text-sm font-medium text-gray-1 transition-colors hover:text-ink"
            >
              <span className="relative">
                GitHub
                <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-red transition-transform duration-300 group-hover/link:scale-x-100" />
              </span>
            </a>
          </div>
        </Reveal>
      </div>
    </article>
  )
}
