import { useState } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { navLinks, profile } from '../data/content'
import MagneticButton from './ui/MagneticButton'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 40))

  return (
    <>
      <motion.header
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-[70] flex justify-center px-4 pt-4 sm:px-6"
      >
        <nav
          className={`flex w-full max-w-6xl items-center justify-between rounded-full border px-3 py-2.5 pl-5 transition-all duration-500 ${
            scrolled
              ? 'border-ink/10 bg-paper/80 shadow-[0_8px_40px_-12px_rgba(31,31,31,0.18)] backdrop-blur-xl'
              : 'border-transparent bg-transparent'
          }`}
        >
          <a href="#top" className="group flex items-center gap-2.5" aria-label="Home">
            <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-ink text-[13px] font-bold text-sand">
              {profile.firstName[0]}
              <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-red" />
            </span>
            <span className="text-[15px] font-semibold tracking-tight text-ink">
              {profile.firstName}
              <span className="text-red">.</span>
            </span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="group relative rounded-full px-4 py-2 text-sm font-medium text-ink-2 transition-colors hover:text-ink"
                >
                  {link.label}
                  <span className="absolute inset-x-4 -bottom-0.5 h-px origin-left scale-x-0 bg-red transition-transform duration-300 group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              <MagneticButton href="#contact" variant="primary" strength={0.5}>
                Let's talk
                <span aria-hidden>↗</span>
              </MagneticButton>
            </div>

            <button
              onClick={() => setOpen((v) => !v)}
              data-cursor="hover"
              aria-label="Toggle menu"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/10 bg-paper/70 md:hidden"
            >
              <div className="flex flex-col items-center gap-[5px]">
                <span
                  className={`h-px w-5 bg-ink transition-all duration-300 ${
                    open ? 'translate-y-[6px] rotate-45' : ''
                  }`}
                />
                <span
                  className={`h-px w-5 bg-ink transition-all duration-300 ${open ? 'opacity-0' : ''}`}
                />
                <span
                  className={`h-px w-5 bg-ink transition-all duration-300 ${
                    open ? '-translate-y-[6px] -rotate-45' : ''
                  }`}
                />
              </div>
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[65] flex flex-col bg-sand/95 px-6 pb-10 pt-28 backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i + 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-ink/10 py-4 text-4xl font-semibold tracking-tight text-ink"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-auto flex items-center justify-center rounded-full bg-red py-4 text-base font-medium text-white"
            >
              Let's talk ↗
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
