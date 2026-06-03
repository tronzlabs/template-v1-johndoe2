import { projects } from '../data/content'
import SectionHeading from './ui/SectionHeading'
import ProjectCard from './ProjectCard'

export default function Projects() {
  return (
    <section id="work" className="relative mx-auto max-w-6xl px-5 py-28 sm:px-6 sm:py-36">
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <SectionHeading
          index="03"
          eyebrow="Selected Work"
          title="Projects I'm proud to ship."
        />
        <p className="max-w-xs text-sm leading-relaxed text-gray-1 sm:text-right">
          A few recent builds — each one a balance of engineering rigor and design craft.
        </p>
      </div>

      <div className="mt-20 flex flex-col gap-24 sm:gap-32">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  )
}
