import { motion } from 'framer-motion'

/**
 * Animated technology pill. Hovering lifts it and reveals a red fill that
 * wipes up from the bottom; the label inverts to white.
 */
export default function AnimatedTag({ children, accent = false, index = 0 }) {
  return (
    <motion.span
      data-cursor="hover"
      initial={{ opacity: 0, y: 14, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      className={`group/tag relative inline-flex select-none items-center overflow-hidden rounded-full border px-4 py-2 text-sm font-medium tracking-tight transition-colors duration-300 ${
        accent
          ? 'border-red/30 bg-red/5 text-ink'
          : 'border-ink/12 bg-white/60 text-ink-2'
      }`}
    >
      <span className="relative z-10 transition-colors duration-300 group-hover/tag:text-white">
        {children}
      </span>
      <span className="absolute inset-0 z-0 translate-y-full bg-red transition-transform duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/tag:translate-y-0" />
    </motion.span>
  )
}
