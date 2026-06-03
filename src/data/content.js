/* ------------------------------------------------------------------ */
/*  Single source of truth for portfolio content                       */
/* ------------------------------------------------------------------ */

export const profile = {
  name: 'John Doe',
  firstName: 'John',
  role: 'Design-minded Software Engineer',
  location: 'Hyderabad, IN — working worldwide',
  email: 'hello@johndoe.dev',
  available: true,
  socials: {
    github: 'https://github.com/',
    linkedin: 'https://linkedin.com/in/',
    x: 'https://x.com/',
    resume: '/resume.pdf',
  },
}

export const navLinks = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Stack', href: '#stack' },
  { label: 'Experience', href: '#experience' },
  { label: 'Process', href: '#process' },
]

export const metrics = [
  { value: 6, suffix: '+', label: 'Years building products' },
  { value: 40, suffix: '+', label: 'Projects shipped' },
  { value: 24, suffix: '', label: 'Technologies in rotation' },
  { value: 99, suffix: '%', label: 'Client return rate' },
]

export const stack = [
  {
    category: 'Frontend',
    span: 'lg:col-span-3 lg:row-span-2',
    accent: true,
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'GSAP', 'Framer Motion', 'Three.js', 'Redux'],
  },
  {
    category: 'Backend',
    span: 'lg:col-span-3',
    items: ['Node.js', 'Express', 'tRPC', 'GraphQL', 'Go'],
  },
  {
    category: 'Database',
    span: 'lg:col-span-2',
    items: ['PostgreSQL', 'Redis', 'Prisma', 'MongoDB'],
  },
  {
    category: 'DevOps',
    span: 'lg:col-span-2',
    items: ['Docker', 'AWS', 'Vercel', 'CI/CD'],
  },
  {
    category: 'Tools',
    span: 'lg:col-span-2',
    items: ['Git', 'Vite', 'Storybook', 'Playwright'],
  },
  {
    category: 'Design',
    span: 'lg:col-span-6',
    items: ['Figma', 'Spline', 'Motion Design', 'Design Systems', 'Prototyping'],
  },
]

export const projects = [
  {
    id: '01',
    title: 'Nebula Analytics',
    subtitle: 'Realtime product analytics platform',
    description:
      'A blazing-fast analytics suite with live dashboards, funnel exploration and a query engine that returns insights in under 200ms.',
    tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'WebSockets'],
    year: '2025',
    role: 'Lead Frontend',
    live: '#',
    github: '#',
    hue: '#FF0001',
    image: '/26.jpg',
  },
  {
    id: '02',
    title: 'Drift Banking',
    subtitle: 'Modern fintech for the next generation',
    description:
      'End-to-end banking experience with instant transfers, budgeting intelligence and a delightfully smooth onboarding flow.',
    tags: ['React', 'Node.js', 'Stripe', 'Framer Motion'],
    year: '2024',
    role: 'Product Engineer',
    live: '#',
    github: '#',
    hue: '#2E2E2E',
    image: '/27.jpg',
  },
  {
    id: '03',
    title: 'Atlas Design System',
    subtitle: 'Component library powering 30+ apps',
    description:
      'A fully themeable, accessible design system with 120+ components, token pipeline and live documentation.',
    tags: ['React', 'Storybook', 'Design Systems', 'a11y'],
    year: '2024',
    role: 'Frontend Architect',
    live: '#',
    github: '#',
    hue: '#5B5B5B',
    image: '/hero.jpg',
  },
  {
    id: '04',
    title: 'Orbit Commerce',
    subtitle: 'Headless storefront with 3D product views',
    description:
      'Headless e-commerce experience with interactive 3D product previews, edge caching and a 100/100 Lighthouse score.',
    tags: ['Next.js', 'Three.js', 'Shopify', 'Vercel'],
    year: '2023',
    role: 'Full-stack',
    live: '#',
    github: '#',
    hue: '#FF0001',
    image: '/portfolio_hero.jpg',
  },
]

export const experience = [
  {
    company: 'Vercel',
    role: 'Senior Frontend Engineer',
    duration: '2023 — Present',
    location: 'Remote',
    highlights: [
      'Led the redesign of the dashboard, improving task completion by 38%.',
      'Built a motion system adopted across 6 product teams.',
      'Mentored 4 engineers and owned the frontend performance budget.',
    ],
  },
  {
    company: 'Stripe',
    role: 'Product Engineer',
    duration: '2021 — 2023',
    location: 'Bengaluru',
    highlights: [
      'Shipped the new checkout flow used by millions of merchants.',
      'Reduced bundle size by 41% through aggressive code-splitting.',
      'Drove the migration to a typed design-token pipeline.',
    ],
  },
  {
    company: 'Freelance',
    role: 'Independent Engineer & Designer',
    duration: '2019 — 2021',
    location: 'Worldwide',
    highlights: [
      'Delivered 20+ products for startups and agencies.',
      'Owned projects end-to-end from discovery to launch.',
      'Specialised in high-craft marketing sites and web apps.',
    ],
  },
]

export const processSteps = [
  {
    no: '01',
    title: 'Discover',
    text: 'I dig into the problem, the users and the business goals — aligning on what success actually looks like before a single pixel is drawn.',
    points: ['Research & audits', 'Goals & metrics', 'Scope & roadmap'],
  },
  {
    no: '02',
    title: 'Design',
    text: 'Wireframes evolve into high-fidelity, motion-aware designs. Every interaction is intentional and grounded in a real design system.',
    points: ['Wireframes', 'Visual design', 'Prototyping'],
  },
  {
    no: '03',
    title: 'Build',
    text: 'I engineer fast, accessible and maintainable products with clean architecture and a relentless focus on the details.',
    points: ['Architecture', 'Development', 'Testing'],
  },
  {
    no: '04',
    title: 'Launch',
    text: 'Ship with confidence — performance budgets met, analytics wired up, and a plan to iterate based on real usage.',
    points: ['QA & perf', 'Deployment', 'Iterate'],
  },
]

export const testimonials = [
  {
    quote:
      'John is the rare engineer who genuinely understands design. The work shipped faster than we expected and looked better than we imagined.',
    name: 'Sarah Chen',
    title: 'Founder, Nebula',
  },
  {
    quote:
      'Working with John felt like adding a senior designer and a senior engineer at once. Our product finally feels premium.',
    name: 'Marcus Webb',
    title: 'CPO, Drift',
  },
  {
    quote:
      'The attention to motion and detail is unmatched. Our conversion rate jumped 27% after the rebuild.',
    name: 'Aisha Khan',
    title: 'Head of Growth, Orbit',
  },
  {
    quote:
      'Clear communication, beautiful execution, zero drama. Exactly what you want when shipping something important.',
    name: 'David Park',
    title: 'Engineering Lead, Atlas',
  },
]
