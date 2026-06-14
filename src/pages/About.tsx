import Reveal from "../components/Reveal"
import ProjectCard from "../components/ProjectCard"
import type { Project } from "../components/ProjectCard"

import htmlIcon from "../assets/images/html.svg"
import cssIcon from "../assets/images/css.svg"
import jsIcon from "../assets/images/javascript.svg"
import reactIcon from "../assets/images/react.svg"
import flutterIcon from "../assets/images/flutter.svg"
import tailwindIcon from "../assets/images/tailwind.svg"
import bootstrapIcon from "../assets/images/bootstrap.svg"
import javaIcon from "../assets/images/java.svg"
import csharpIcon from "../assets/images/csharp.svg"
import pythonIcon from "../assets/images/python.svg"
import figmaIcon from "../assets/images/figma.svg"

import getstacImg from "../assets/images/getstac.png"
import spikkImg from "../assets/images/spikk.png"
import mowoImg from "../assets/images/mowo.png"
import cyclexImg from "../assets/images/cyclex.png"
import spikkWeb from "../assets/images/spikk-web.png"
import ninthgridWeb from "../assets/images/ninthgrid.png"
import oshodifoodWeb from "../assets/images/oshodifood.png"
import glodWeb from "../assets/images/gloed.png"
import mowoWeb from "../assets/images/mowoafrica.png"
import babysittingWeb from "../assets/images/babysittingbuddies.png"
import persziWeb from "../assets/images/perzsi.png"
import cyclexWeb from "../assets/images/cyclexafrica.png"

const skills = [
  { name: "HTML", icon: htmlIcon },
  { name: "CSS", icon: cssIcon },
  { name: "JavaScript", icon: jsIcon },
  { name: "React", icon: reactIcon },
  { name: "Flutter", icon: flutterIcon },
  { name: "Tailwind CSS", icon: tailwindIcon },
  { name: "Bootstrap", icon: bootstrapIcon },
  { name: "Java", icon: javaIcon },
  { name: "C#", icon: csharpIcon },
  { name: "Python", icon: pythonIcon },
  { name: "Figma", icon: figmaIcon },
]

const roles = [
  "Front-end Engineer",
  "Back-end Engineer",
  "DevOps Engineer",
  "AI/ML Engineer",
  "QA Engineer",
  "Cyber Security Expert",
  "UI/UX Designer",
  "Data Scientist",
  "Product Manager",
]

const mobileProjects: Project[] = [
  { name: "Mowo Africa", category: "Mobile App", image: mowoImg, href: "https://apps.apple.com/ng/app/mowo-africa/id6746742816", fit: "contain" },
  { name: "Getstac", category: "Mobile App", image: getstacImg, href: "https://play.google.com/store/apps/details?id=com.getstac.getstac_beta&hl=en", fit: "contain" },
  { name: "Spikk", category: "Mobile App", image: spikkImg, href: "https://play.google.com/store/apps/details?id=com.spikk&hl=en", fit: "contain" },
  { name: "CyclexAfrica", category: "Mobile App", image: cyclexImg, href: "https://play.google.com/store/apps/details?id=com.cyclex.mobile&hl=en",fit: "contain" },
]

const webProjects: Project[] = [
  { name: "Spikk", category: "Web Platform", image: spikkWeb, href: "https://spikk.co" },
  { name: "Ninthgrid", category: "Web Platform", image: ninthgridWeb, href: "https://ninthgrid.com" },
  { name: "Oshodi Food", category: "Web Platform", image: oshodifoodWeb, href: "https://oshodifood.com" },
  { name: "Glod", category: "Web Platform", image: glodWeb, href: "https://glod.io" },
  { name: "Mowo Africa", category: "Web Platform", image: mowoWeb, href: "https://mowoafrica.com" },
  { name: "Babysitting Buddies", category: "Web Platform", image: babysittingWeb, href: "https://babysittingbuddiesci.com" },
  { name: "Perszi", category: "Web Platform", image: persziWeb, href: "https://perszi.com" },
  { name: "CyclexAfrica", category: "Web Platform", image: cyclexWeb, href: "https://cyclexafrica.com" },
]

const About = () => {
  return (
    <main className="w-full">
      {/* Intro */}
      <section className="w-full bg-white px-6 md:px-10 lg:px-[100px] pt-36 pb-24">
        <Reveal>
          <div className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-wider text-ink-400">About Buimas</p>
            <h1 className="mt-3 text-4xl font-semibold text-ink-900 md:text-5xl">We build the software behind growing businesses</h1>
            <p className="mt-6 text-lg leading-relaxed text-ink-500">
              Buimas is a global software development agency providing on-demand teams of engineers and tech professionals to build custom, high-performing solutions. Our mission is to help businesses innovate and scale through technology — with flexible, scalable, and cost-efficient delivery.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Skills */}
      <section className="w-full bg-ink-50 px-6 md:px-10 lg:px-[100px] py-24">
        <Reveal>
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-wider text-ink-400">Our toolkit</p>
            <h2 className="mt-3 text-3xl font-semibold text-ink-900 md:text-4xl">Skills & Technologies</h2>
          </div>
        </Reveal>
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {skills.map((skill, index) => (
            <Reveal key={skill.name} delay={index * 0.05}>
              <div className="group flex h-full flex-col items-center justify-center gap-4 rounded-xl border border-ink-100 bg-white p-6 transition duration-300 hover:border-ink-900 hover:bg-ink-950">
                <img src={skill.icon} alt="" className="h-10 w-10" />
                <span className="text-sm font-medium text-ink-800 transition duration-300 group-hover:text-white">{skill.name}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Roles */}
      <section className="w-full bg-white px-6 md:px-10 lg:px-[100px] py-24">
        <Reveal>
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-wider text-ink-400">Talent on demand</p>
            <h2 className="mt-3 text-3xl font-semibold text-ink-900 md:text-4xl">Roles we provide</h2>
            <p className="mt-4 text-ink-500">Embed senior, vetted specialists into your team across the full product lifecycle.</p>
          </div>
        </Reveal>
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {roles.map((role, index) => (
            <Reveal key={role} delay={index * 0.05}>
              <div className="rounded-xl border border-ink-200 bg-white px-6 py-5 text-center font-medium text-ink-900 transition duration-300 hover:border-ink-900 hover:shadow-sm">
                {role}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Work */}
      <section className="w-full bg-ink-950 px-6 md:px-10 lg:px-[100px] py-24 md:py-32">
        <Reveal>
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-wider text-ink-400">Our work</p>
            <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">Products we've shipped</h2>
            <p className="mt-4 text-ink-300">A selection of mobile and web products we've designed, built, and launched.</p>
          </div>
        </Reveal>

        <Reveal>
          <h3 className="mt-16 text-sm font-medium uppercase tracking-wider text-ink-400">Mobile apps</h3>
        </Reveal>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {mobileProjects.map((project, index) => (
            <Reveal key={project.name} delay={index * 0.05}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>

        <Reveal>
          <h3 className="mt-16 text-sm font-medium uppercase tracking-wider text-ink-400">Web platforms</h3>
        </Reveal>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {webProjects.map((project, index) => (
            <Reveal key={`${project.name}-web`} delay={index * 0.05}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  )
}

export default About