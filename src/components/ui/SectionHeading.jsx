import Reveal from './Reveal'
import TextReveal from './TextReveal'

/**
 * Consistent section header: a small red-dotted eyebrow/index label plus a
 * large split-text title and optional supporting line.
 */
export default function SectionHeading({ index, eyebrow, title, intro, align = 'left' }) {
  return (
    <div className={`max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      <Reveal>
        <div
          className={`flex items-center gap-3 ${
            align === 'center' ? 'justify-center' : ''
          }`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-red" />
          <span className="text-xs font-medium uppercase tracking-[0.25em] text-gray-1">
            {index ? `${index} — ` : ''}
            {eyebrow}
          </span>
        </div>
      </Reveal>

      <TextReveal
        as="h2"
        className="mt-5 text-4xl font-semibold leading-[0.95] tracking-tight text-ink sm:text-5xl md:text-6xl"
      >
        {title}
      </TextReveal>

      {intro && (
        <Reveal delay={0.1}>
          <p
            className={`mt-6 text-lg leading-relaxed text-gray-1 ${
              align === 'center' ? 'mx-auto' : ''
            } max-w-xl`}
          >
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  )
}
