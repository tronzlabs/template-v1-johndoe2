import { useLayoutEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from '../lib/gsap'
import { profile } from '../data/content'
import TextReveal from './ui/TextReveal'
import MagneticButton from './ui/MagneticButton'
import Marquee from './ui/Marquee'

const marqueeWords = ['Frontend', 'Product', 'Motion', 'Systems', 'Interfaces', 'Performance']

export default function Hero() {
  const root = useRef(null)
  const shapesRef = useRef(null)
  const spotRef = useRef(null)

  useLayoutEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      // Intro reveal for meta rows + ctas
      gsap.from('[data-hero-fade]', {
        y: 24,
        opacity: 0,
        duration: 1,
        ease: 'expo.out',
        stagger: 0.12,
        delay: 0.7,
      })

      if (reduced) return

      // Continuous float for accent shapes
      gsap.utils.toArray('[data-float]').forEach((el, i) => {
        gsap.to(el, {
          y: i % 2 === 0 ? '+=24' : '-=30',
          x: i % 2 === 0 ? '+=14' : '-=10',
          rotation: i % 2 === 0 ? 8 : -10,
          duration: 4 + i,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      })

      // Slow drift for the gradient blobs
      gsap.utils.toArray('[data-blob]').forEach((el, i) => {
        gsap.to(el, {
          x: i % 2 === 0 ? '+=80' : '-=90',
          y: i % 2 === 0 ? '-=60' : '+=70',
          scale: 1.15,
          duration: 9 + i * 2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      })

      // Rotating dashed accent ring
      gsap.to('[data-ring]', { rotation: 360, duration: 60, repeat: -1, ease: 'none' })

      // Scroll-linked background drift
      gsap.to('[data-hero-bg]', {
        yPercent: 18,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      })
      gsap.to('[data-hero-content]', {
        yPercent: 12,
        opacity: 0.35,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      })
    }, root)

    // Mouse-follow parallax + cursor spotlight
    const onMove = (e) => {
      if (reduced) return
      const { innerWidth, innerHeight } = window

      if (spotRef.current) {
        gsap.to(spotRef.current, {
          '--x': `${e.clientX}px`,
          '--y': `${e.clientY}px`,
          duration: 0.6,
          ease: 'power3.out',
          overwrite: 'auto',
        })
      }

      if (!shapesRef.current) return
      const rx = (e.clientX / innerWidth - 0.5) * 2
      const ry = (e.clientY / innerHeight - 0.5) * 2
      shapesRef.current.querySelectorAll('[data-float]').forEach((el, i) => {
        const depth = (i + 1) * 10
        gsap.to(el, { x: rx * depth, y: ry * depth, duration: 1, ease: 'power3.out', overwrite: 'auto' })
      })
    }
    window.addEventListener('mousemove', onMove)

    return () => {
      window.removeEventListener('mousemove', onMove)
      ctx.revert()
    }
  }, [])

  return (
    <section
      id="top"
      ref={root}
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-28"
    >
      {/* Background layers — animated mesh + dot grid + accent ring */}
      <div data-hero-bg className="pointer-events-none absolute inset-0 -z-20 overflow-hidden">
        {/* Drifting gradient blobs */}
        <div data-blob className="absolute left-[12%] top-[12%] h-[46vh] w-[46vh] rounded-full bg-red/25 blur-[110px]" />
        <div data-blob className="absolute right-[8%] top-[28%] h-[40vh] w-[40vh] rounded-full bg-[#ff8a5b]/25 blur-[120px]" />
        <div data-blob className="absolute bottom-[6%] left-[38%] h-[42vh] w-[42vh] rounded-full bg-red/15 blur-[130px]" />

        {/* Fine dot grid */}
        <div
          className="absolute inset-0 opacity-[0.6]"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(31,31,31,0.16) 1px, transparent 1px)',
            backgroundSize: '26px 26px',
            maskImage: 'radial-gradient(ellipse 75% 60% at 50% 42%, #000 35%, transparent 100%)',
          }}
        />

        {/* Crisp line grid for structure */}
        <div
          className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(31,31,31,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(31,31,31,0.04) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
            maskImage: 'radial-gradient(ellipse 80% 65% at 50% 42%, #000 45%, transparent 100%)',
          }}
        />

        {/* Rotating dashed accent ring behind the headline */}
        <svg
          data-ring
          className="absolute left-1/2 top-1/2 h-[80vmin] w-[80vmin] -translate-x-1/2 -translate-y-1/2 text-red/20"
          viewBox="0 0 200 200"
          fill="none"
        >
          <circle cx="100" cy="100" r="98" stroke="currentColor" strokeWidth="0.4" strokeDasharray="2 6" />
          <circle cx="100" cy="100" r="74" stroke="currentColor" strokeWidth="0.4" strokeDasharray="1 9" />
        </svg>
      </div>

      {/* Cursor-follow spotlight (interactive) */}
      <div
        ref={spotRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 hidden lg:block"
        style={{
          '--x': '50%',
          '--y': '40%',
          background:
            'radial-gradient(420px circle at var(--x) var(--y), rgba(255,0,1,0.12), transparent 70%)',
        }}
      />

      {/* Floating accent shapes — layered above backdrop */}
      <div ref={shapesRef} className="pointer-events-none absolute inset-0 -z-10">
        <div data-float className="absolute left-[8%] top-[24%] h-24 w-24 rounded-full bg-red/90 mix-blend-multiply blur-[2px]" />
        <div data-float className="absolute right-[12%] top-[20%] h-32 w-32 rounded-[30%] border-2 border-ink/15" />
        <div data-float className="absolute bottom-[22%] right-[18%] h-16 w-16 rounded-full border-2 border-red/40" />
        <div data-float className="absolute bottom-[26%] left-[16%] h-20 w-20 rotate-12 rounded-2xl bg-ink/5 backdrop-blur-sm" />
        <svg data-float className="absolute left-[42%] top-[14%] h-10 w-10 text-red/70" viewBox="0 0 24 24" fill="none">
          <path d="M12 2v20M2 12h20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      <div data-hero-content className="mx-auto w-full max-w-6xl px-5 sm:px-6">
        {/* Availability */}
        <div data-hero-fade className="mb-8 flex items-center justify-center">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-ink/10 bg-white/60 px-4 py-2 text-sm font-medium text-ink-2 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            Available for select projects — 2026
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-center text-[clamp(2.6rem,9vw,8rem)] font-semibold leading-[0.92] tracking-[-0.04em] text-ink">
          <TextReveal as="span" split="chars" immediate delay={0.35} stagger={0.028} className="block">
            Building products
          </TextReveal>
          <span className="block">
            <TextReveal as="span" split="chars" immediate delay={0.6} stagger={0.028} className="text-outline">
              people actually
            </TextReveal>
          </span>
          <span className="relative block">
            <TextReveal as="span" split="chars" immediate delay={0.85} stagger={0.028} className="text-red">
              enjoy using.
            </TextReveal>
          </span>
        </h1>

        {/* Sub + intro */}
        <div className="mt-10 flex flex-col items-center gap-8">
          <p data-hero-fade className="max-w-xl text-balance text-center text-lg leading-relaxed text-gray-1">
            I'm <span className="font-medium text-ink">{profile.name}</span>, a {profile.role.toLowerCase()} who
            ships fast, scalable products at the intersection of clean engineering and thoughtful design.
          </p>

          <div data-hero-fade className="flex flex-wrap items-center justify-center gap-3">
            <MagneticButton href="#work" variant="primary">
              View selected work
              <span aria-hidden>↗</span>
            </MagneticButton>
            <MagneticButton href="#contact" variant="ghost">
              Get in touch
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* Bottom marquee */}
      <div className="absolute inset-x-0 bottom-0">
        <div className="border-y border-ink/10 bg-paper/40 py-3 backdrop-blur-sm">
          <Marquee duration={28}>
            {marqueeWords.map((w, i) => (
              <span key={i} className="mx-6 inline-flex items-center gap-6 text-2xl font-medium tracking-tight text-ink/70">
                {w}
                <span className="h-1.5 w-1.5 rounded-full bg-red" />
              </span>
            ))}
          </Marquee>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-20 left-6 hidden items-center gap-3 text-xs uppercase tracking-[0.25em] text-gray-2 lg:flex"
      >
        <span className="inline-block h-10 w-px overflow-hidden bg-ink/15">
          <motion.span
            className="block h-1/2 w-px bg-red"
            animate={{ y: ['-100%', '200%'] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
        Scroll
      </motion.div>
    </section>
  )
}
