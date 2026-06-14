export type Project = {
  name: string
  category: string
  description?: string
  image: string
  href?: string
  fit?: "cover" | "contain"
}

const ProjectCard = ({ project }: { project: Project }) => {
  const contain = project.fit === "contain"

  const inner = (
    <>
      <div className={contain ? "flex items-center justify-center bg-ink-950 p-4" : "overflow-hidden"}>
        <img
          src={project.image}
          alt={`${project.name} screenshot`}
          loading="lazy"
          className={`aspect-[16/10] w-full transition-transform duration-500 group-hover:scale-105 ${contain ? "object-contain" : "object-cover object-top"}`}
        />
      </div>
      <div className="flex items-start justify-between gap-4 p-6">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-ink-400">{project.category}</p>
          <h3 className="mt-1 text-lg font-semibold text-white">{project.name}</h3>
          {project.description ? <p className="mt-2 text-sm text-ink-300">{project.description}</p> : null}
        </div>
        {project.href ? (
          <span className="mt-1 flex-none text-ink-400 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white">↗</span>
        ) : null}
      </div>
    </>
  )

  const className = "group block overflow-hidden rounded-2xl border border-white/10 bg-ink-900 transition duration-300 hover:border-white/25"

  return project.href ? (
    <a href={project.href} target="_blank" rel="noopener noreferrer" className={className}>
      {inner}
    </a>
  ) : (
    <div className={className}>{inner}</div>
  )
}

export default ProjectCard