import { motion } from 'framer-motion'
import { stack } from '../data/content'
import SectionHeading from './ui/SectionHeading'
import AnimatedTag from './ui/AnimatedTag'

export default function TechStack() {
  return (
    <section id="stack" className="relative mx-auto max-w-6xl px-5 py-28 sm:px-6 sm:py-36">
      <SectionHeading
        index="02"
        eyebrow="Tech Stack"
        title="A toolkit built for speed and craft."
        intro="The technologies I reach for to design, build and ship modern products end-to-end."
      />

      <div className="mt-16 grid auto-rows-[minmax(0,1fr)] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
        {stack.map((group, gi) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: gi * 0.06, ease: [0.16, 1, 0.3, 1] }}
            data-cursor="hover"
            className={`group relative flex flex-col overflow-hidden rounded-3xl border p-6 transition-all duration-500 sm:p-7 ${
              group.span || ''
            } ${
              group.accent
                ? 'border-red/20 bg-gradient-to-br from-red/8 via-paper to-paper'
                : 'border-ink/10 bg-paper hover:bg-white'
            }`}
          >
            {/* hover glow */}
            <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-red/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-lg font-semibold tracking-tight text-ink">{group.category}</h3>
              <span className="font-mono text-xs text-gray-2">0{gi + 1}</span>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {group.items.map((item, i) => (
                <AnimatedTag key={item} index={i} accent={group.accent}>
                  {item}
                </AnimatedTag>
              ))}
            </div>

            {group.accent && (
              <p className="mt-auto pt-6 text-sm leading-relaxed text-gray-1">
                My home turf — where design systems, motion and performance come together.
              </p>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  )
}
