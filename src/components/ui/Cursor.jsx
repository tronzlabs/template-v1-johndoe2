import { useEffect, useRef, useState } from 'react'

/**
 * A premium custom cursor: a small dot that tracks instantly and a larger
 * ring that lags behind. The ring grows + turns red over interactive
 * elements (anything with [data-cursor="hover"], a, button).
 * Disabled on touch / coarse-pointer devices.
 */
export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const [enabled, setEnabled] = useState(false)

  // Detect a precise pointer once on mount.
  useEffect(() => {
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      setEnabled(true)
    }
  }, [])

  // Wire up tracking only after the cursor elements are mounted.
  useEffect(() => {
    if (!enabled) return
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let ringX = mouseX
    let ringY = mouseY
    let raf

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`
    }

    const loop = () => {
      ringX += (mouseX - ringX) * 0.18
      ringY += (mouseY - ringY) * 0.18
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`
      raf = requestAnimationFrame(loop)
    }

    const onOver = (e) => {
      const t = e.target.closest('a, button, [data-cursor="hover"]')
      ring.dataset.hover = t ? 'true' : 'false'
    }

    const onLeave = () => {
      dot.style.opacity = ring.style.opacity = '0'
    }
    const onEnter = () => {
      dot.style.opacity = ring.style.opacity = '1'
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)
    loop()

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      cancelAnimationFrame(raf)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[100] h-1.5 w-1.5 rounded-full bg-red"
      />
      <div
        ref={ringRef}
        data-hover="false"
        className="pointer-events-none fixed left-0 top-0 z-[100] h-9 w-9 rounded-full border border-ink/40 transition-[width,height,background-color,border-color] duration-300 ease-out data-[hover=true]:h-14 data-[hover=true]:w-14 data-[hover=true]:border-red data-[hover=true]:bg-red/10"
      />
    </>
  )
}
