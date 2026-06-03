const TEMPLATE_TITLE = 'Portfolio'
const TEMPLATE_DESCRIPTION =
  'Design-minded developer portfolio with premium motion, GSAP scroll storytelling, and conversion-focused layout.'

const CONTACT_HREF = (() => {
  const p = new URLSearchParams()
  p.set('template', TEMPLATE_TITLE)
  p.set('description', TEMPLATE_DESCRIPTION)
  return `https://www.tronzlabs.com/contact?${p.toString()}`
})()

export default function StartProjectOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[10000] flex justify-center px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 sm:px-4 sm:pb-6"
      role="complementary"
      aria-label="Open Tronzlabs contact to use this template"
    >
      <a
        href={CONTACT_HREF}
        target="_blank"
        rel="noreferrer"
        data-cursor="hover"
        className="pointer-events-auto flex min-h-[48px] w-full max-w-sm touch-manipulation items-center justify-center gap-2 rounded-full border border-ink/15 bg-ink/90 px-4 py-3 text-center text-[11px] font-semibold uppercase leading-tight tracking-wide text-sand shadow-2xl backdrop-blur-md transition hover:border-ink/25 hover:bg-ink active:bg-ink sm:min-h-0 sm:w-auto sm:max-w-none sm:px-6 sm:py-3.5 sm:text-sm sm:leading-normal sm:tracking-[0.1em]"
      >
        Use this template
        <span aria-hidden className="shrink-0">
          ↗
        </span>
      </a>
    </div>
  )
}
