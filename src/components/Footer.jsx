import { profile } from '../data/content'
import Marquee from './ui/Marquee'
import TronzlabsAttribution from './ui/TronzlabsAttribution'

const socials = [
  { label: 'GitHub', href: profile.socials.github },
  { label: 'LinkedIn', href: profile.socials.linkedin },
  { label: 'X', href: profile.socials.x },
  { label: 'Email', href: `mailto:${profile.email}` },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden bg-ink pt-16 text-sand">
      {/* Giant marquee name */}
      <div className="border-b border-sand/10 pb-6">
        <Marquee duration={36}>
          <span className="mx-8 text-[14vw] font-semibold leading-none tracking-tighter text-sand/90">
            {profile.name}
          </span>
          <span className="mx-8 text-[14vw] font-semibold leading-none tracking-tighter text-outline-sand">
            Available 2026
          </span>
        </Marquee>
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-5 py-12 sm:px-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-sm">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-sand text-[13px] font-bold text-ink">
              {profile.firstName[0]}
              <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-red" />
            </span>
            <span className="text-[15px] font-semibold tracking-tight">
              {profile.firstName}
              <span className="text-red">.</span>
            </span>
          </div>
          <p className="mt-5 leading-relaxed text-sand/55">
            Designing and engineering digital products that feel as good as they look. Let's make
            something worth remembering.
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-8 gap-y-3">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith('mailto') ? undefined : '_blank'}
              rel="noreferrer"
              data-cursor="hover"
              className="group relative text-sm font-medium text-sand/70 transition-colors hover:text-sand"
            >
              {s.label}
              <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-red transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-4 border-t border-sand/10 px-5 py-6 text-xs text-sand/40 sm:gap-5 sm:px-6 md:flex-row md:items-center md:justify-between">
        <span className="text-center md:text-left">
          © {year} {profile.name}. All rights reserved.
        </span>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:justify-center md:justify-end md:gap-6">
          <TronzlabsAttribution />
          <span className="hidden items-center gap-2 text-sand/40 sm:inline-flex">
            Crafted with React, GSAP &amp; a lot of care
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-red" />
          </span>
          <a
            href="#top"
            data-cursor="hover"
            className="transition-colors hover:text-sand whitespace-nowrap"
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  )
}
