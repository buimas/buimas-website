import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import Reveal from "./Reveal"

const steps = [
  {
    id: "01",
    title: "Discover & Plan",
    description:
      "We start by understanding your business inside out. Through workshops and technical audits, we turn ambiguity into a clear, prioritised plan before a single line of code is written.",
    details: [
      "Stakeholder workshops & goal alignment",
      "Technical & infrastructure audit",
      "Solution architecture blueprint",
      "Prioritised delivery roadmap",
    ],
    tags: ["Tech Audit", "Roadmap", "User Stories"],
    image: "/images/process-discover.png",
  },
  {
    id: "02",
    title: "Design & Build",
    description:
      "Design and engineering move together in two-week sprints. You see working software early and often, built on clean architecture that won't buckle as you grow.",
    details: [
      "UX wireframes & interactive prototypes",
      "Reusable design system & UI library",
      "Scalable, test-covered codebase",
      "Sprint demos every two weeks",
    ],
    tags: ["Iterative Sprints", "UI/UX", "Clean Code"],
    image: "/images/process-design.png",
  },
  {
    id: "03",
    title: "Test & Launch",
    description:
      "We don't just ship, we verify. Every release is hardened through automated testing and real-world UAT, then deployed with zero downtime so your users never feel the switch.",
    details: [
      "Automated unit & integration tests",
      "User acceptance testing (UAT)",
      "Performance & security hardening",
      "CI/CD pipeline & zero-downtime deploy",
    ],
    tags: ["QA Automation", "UAT", "CI/CD"],
    image: "/images/process-test.png",
  },
  {
    id: "04",
    title: "Scale & Support",
    description:
      "Launch is the starting line. We stay on as your engineering partner — monitoring, iterating, and scaling your infrastructure as demand grows.",
    details: [
      "Proactive monitoring & maintenance",
      "Feature iterations from user feedback",
      "Cloud infrastructure scaling",
      "Dedicated support with clear SLAs",
    ],
    tags: ["Maintenance", "Cloud Scaling", "Iterations"],
    image: "/images/process-scale.png",
  },
]

const ProcessSection = () => {
  const [active, setActive] = useState(0)
  const reduceMotion = useReducedMotion()
  const refs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(Number((entry.target as HTMLElement).dataset.index))
          }
        })
      },
      { rootMargin: "-45% 0px -45% 0px" }
    )
    refs.current.forEach((el) => {
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <section className="w-full bg-white px-6 md:px-10 lg:px-[100px] py-24 md:py-32">
      {/* Header */}
      <Reveal>
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-wider text-ink-400">
            How we work
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-ink-900 md:text-5xl">
            Our Process
          </h2>
          <p className="mt-4 text-ink-500">
            A transparent, four-step framework that takes your product from idea to
            scalable reality, no black boxes, no hidden costs.
          </p>
        </div>
      </Reveal>

      <div className="mt-16 grid gap-12 md:grid-cols-2 md:gap-20">
        {/* LEFT — pinned visual stage (desktop only) */}
        <div className="hidden md:block">
          <div className="sticky top-28">
            <div className="relative flex aspect-square items-center justify-center
              overflow-hidden rounded-3xl bg-ink-50">
              <span className="pointer-events-none absolute left-6 top-2 select-none
                text-[10rem] font-bold leading-none text-ink-200">
                {steps[active].id}
              </span>
              <AnimatePresence mode="wait">
                <motion.img
                  key={steps[active].id}
                  src={steps[active].image}
                  alt=""
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduceMotion ? undefined : { opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="relative z-10 max-h-[80%] w-4/5 max-w-md object-contain"
                />
              </AnimatePresence>
            </div>

            {/* Progress segments */}
            <div className="mt-6 flex gap-2">
              {steps.map((s, i) => (
                <span
                  key={s.id}
                  className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                    i === active ? "bg-ink-950" : "bg-ink-200"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT — scrolling steps */}
        <div className="flex flex-col">
          {steps.map((step, index) => (
            <div
              key={step.id}
              data-index={index}
              ref={(el) => {
                refs.current[index] = el
              }}
              className={`flex flex-col justify-center border-t border-ink-100 py-12
                transition-opacity duration-500 md:min-h-[60vh] ${
                  index === active ? "opacity-100" : "opacity-40"
                }`}
            >
              <p className="text-sm font-medium uppercase tracking-wider text-ink-400">
                Step {step.id}
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-ink-900 md:text-3xl">
                {step.title}
              </h3>
              <p className="mt-4 max-w-md text-ink-500">{step.description}</p>

              {/* Deliverables */}
              <ul className="mt-6 space-y-2.5">
                {step.details.map((detail) => (
                  <li
                    key={detail}
                    className="flex items-start gap-3 text-sm text-ink-600"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-ink-300" />
                    {detail}
                  </li>
                ))}
              </ul>

              {/* Illustration shows inline on mobile only */}
              <img
                src={step.image}
                alt=""
                loading="lazy"
                className="mt-6 w-full max-w-xs rounded-2xl md:hidden"
              />

              <div className="mt-6 flex flex-wrap gap-2">
                {step.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-ink-200 px-3 py-1
                      text-xs font-medium text-ink-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProcessSection