import { motion } from 'framer-motion'

/**
 * Lightweight scroll-reveal wrapper using Framer Motion's whileInView.
 * Fades + slides children up once when they enter the viewport.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 28,
  duration = 0.7,
  className = '',
  as = 'div',
  ...rest
}) {
  const MotionTag = motion[as] || motion.div
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}
