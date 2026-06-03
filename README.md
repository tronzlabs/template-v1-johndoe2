# Portfolio — Design-minded Software Engineer

A premium, 2026-generation single-page developer portfolio. Editorial typography,
strategic use of red accents on a warm sand canvas, and a layered motion system
built with GSAP, Framer Motion and Lenis smooth scrolling.

## Stack

- **React 19** + **Vite 8**
- **Tailwind CSS v4** (CSS-first config via `@theme`)
- **Framer Motion** — micro-interactions, reveals, carousel
- **GSAP** + **ScrollTrigger** — split-text, image masks, parallax, pinned horizontal scroll
- **Lenis** — smooth scrolling (synced with ScrollTrigger)
- **General Sans / Satoshi** type (Fontshare)

## Sections

Hero · About (animated metrics) · Tech Stack (bento) · Featured Projects ·
Experience timeline · Process (pinned horizontal) · Testimonials · Contact · Footer

## Getting started

```bash
npm install
npm run dev      # start dev server
npm run build    # production build
npm run preview  # preview the build
```

## Customising

All copy lives in [`src/data/content.js`](src/data/content.js) — name, socials,
metrics, stack, projects, experience, process and testimonials. The design tokens
(colors, fonts, easing) are defined in the `@theme` block of
[`src/index.css`](src/index.css).

Replace project images (currently Unsplash placeholders) and drop a `resume.pdf`
into `public/` to wire up the résumé download.

## Reusable components

`MagneticButton` · `SectionHeading` · `TextReveal` · `Marquee` · `AnimatedTag` ·
`Reveal` · `Cursor` · `ScrollProgress` · `ProjectCard`

## Accessibility & performance

- Respects `prefers-reduced-motion` (disables Lenis, parallax and float loops)
- Custom cursor only on fine-pointer devices
- Vendor code-split (gsap / motion / lenis / react) for better caching
- Semantic landmarks, SEO meta, Open Graph and JSON-LD in `index.html`
