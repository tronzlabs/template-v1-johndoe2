import { useRef, useLayoutEffect, createElement } from 'react'
import { gsap, ScrollTrigger } from '../../lib/gsap'

/**
 * Split-text reveal built on GSAP (no premium SplitText plugin needed).
 * Splits children into words (and optionally chars), each wrapped in an
 * overflow-hidden mask, then staggers them up into view.
 *
 * props:
 *  - as: tag name (default 'div')
 *  - split: 'words' | 'chars' (default 'words')
 *  - immediate: animate on mount instead of on scroll
 *  - delay, stagger, y, duration: tuning
 */
export default function TextReveal({
  children,
  as = 'div',
  split = 'words',
  immediate = false,
  delay = 0,
  stagger = 0.045,
  duration = 0.9,
  className = '',
  ...rest
}) {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const targets = el.querySelectorAll('[data-rv]')

    if (reduced) {
      gsap.set(targets, { y: 0, opacity: 1 })
      return
    }

    const ctx = gsap.context(() => {
      const tween = {
        yPercent: 0,
        opacity: 1,
        duration,
        delay,
        ease: 'expo.out',
        stagger,
      }
      gsap.set(targets, { yPercent: 115, opacity: 0 })

      if (immediate) {
        gsap.to(targets, tween)
      } else {
        gsap.to(targets, {
          ...tween,
          delay: 0,
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        })
      }
    }, el)

    return () => ctx.revert()
  }, [immediate, delay, stagger, duration])

  // Build masked spans
  const text = String(children)
  const words = text.split(' ')

  const content = words.map((word, wi) => (
    <span
      key={wi}
      className="relative inline-block overflow-hidden align-bottom"
      style={{ paddingBottom: '0.12em', marginBottom: '-0.12em' }}
    >
      {split === 'chars' ? (
        word.split('').map((ch, ci) => (
          <span key={ci} data-rv className="inline-block will-change-transform">
            {ch}
          </span>
        ))
      ) : (
        <span data-rv className="inline-block will-change-transform">
          {word}
        </span>
      )}
      {wi < words.length - 1 && '\u00A0'}
    </span>
  ))

  return createElement(as, { ref, className, ...rest }, content)
}
