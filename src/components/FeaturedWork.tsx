import { Link } from "react-router-dom"
import Reveal from "./Reveal"
import ProjectCard from "./ProjectCard"
import type { Project } from "./ProjectCard"

import mowoImg from "../assets/images/mowo.png"
import ninthgridWeb from "../assets/images/ninthgrid.png"
import oshodifoodWeb from "../assets/images/oshodifood.png"
import cyclexWeb from "../assets/images/cyclexafrica.png"

const projects: Project[] = [
  {
    name: "Mowo Africa",
    category: "Mobile App",
    description: "Discover amazing products, support local businesses, and earn commissions every time you shop.",
    image: mowoImg,
    href: "https://apps.apple.com/ng/app/mowo-africa/id6746742816",
    fit: "contain",
  },
  {
    name: "Ninthgrid",
    category: "Web Platform",
    description: "Improve your brand’s storytelling with unique Afrocentric stock images and illustrations to reach a diverse audience.",
    image: ninthgridWeb,
    href: "https://ninthgrid.com",
  },
  {
    name: "Oshodi Food",
    category: "Web Platform",
    description: "Deliver delicious meals to your doorstep with Oshodi Food — your go-to destination for authentic African cuisine.",
    image: oshodifoodWeb,
    href: "https://oshodifood.com",
  },
  {
    name: "CyclexAfrica",
    category: "Web Platform",
    description: "Cyclex the future of sustainable waste management in Africa, creating a greener, cleaner future where recycling and sustainability are prioritized.",
    image: cyclexWeb,
    href: "https://cyclexafrica.com/",
  },
]

const FeaturedWork = () => {
  return (
    <section className="w-full bg-ink-950 px-6 md:px-10 lg:px-[100px] py-24 md:py-32">
      <Reveal>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-wider text-ink-400">Selected work</p>
            <h2 className="mt-3 text-3xl font-semibold text-white md:text-5xl">Products we've shipped</h2>
            <p className="mt-4 text-ink-300">Real applications, live on the web and in the app stores — built, launched, and scaled for founders across Africa and beyond.</p>
          </div>
          <Link to="/about" className="group inline-flex flex-none items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white/10">
            View all work
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </Reveal>

      <div className="mt-16 grid gap-8 md:grid-cols-2">
        {projects.map((project, index) => (
          <Reveal key={project.name} delay={index * 0.1}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export default FeaturedWork