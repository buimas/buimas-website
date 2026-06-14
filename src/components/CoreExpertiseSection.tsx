import talentIcon from "../assets/images/group.svg"
import consultingIcon from "../assets/images/consult.svg"
import transformationIcon from "../assets/images/transform.svg"
import Reveal from "./Reveal"

const expertise = [
  {
    title: "Custom Software Development",
    description:
      "Custom applications built for performance, security, and scale using modern frameworks.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
        viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M16.5 7.5L19.5 12L16.5 16.5M7.5 16.5L4.5 12L7.5 7.5M14 4L10 20" />
      </svg>
    ),
  },
  {
    title: "Tech Talent Outsourcing",
    description:
      "Elite engineering teams integrated seamlessly into your workflow to boost delivery velocity.",
    icon: <img src={talentIcon} alt="" className="h-6 w-6" />,
  },
  {
    title: "Technical Consulting",
    description:
      "Strategic roadmaps to modernize legacy infrastructure and drive digital innovation.",
    icon: <img src={consultingIcon} alt="" className="h-6 w-6" />,
  },
  {
    title: "Digital Transformation",
    description:
      "We help you pivot from outdated systems to cutting-edge, future-ready solutions.",
    icon: <img src={transformationIcon} alt="" className="h-6 w-6" />,
  },
]

const CoreExpertiseSection = () => {
  return (
    <section className="w-full bg-ink-950 px-6 md:px-10 lg:px-[100px] py-24">
      {/* Header */}
      <Reveal>
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-wider text-ink-400">
            What we do
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">
            Our Core Expertise
          </h2>
          <p className="mt-4 text-ink-300">
            End-to-end technology services tailored to your business — from custom
            development to strategic talent integration.
          </p>
        </div>
      </Reveal>

      {/* Cards */}
      <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {expertise.map((item, index) => (
          <Reveal key={item.title} delay={index * 0.1}>
            <div className="group h-full rounded-2xl border border-white/10 bg-ink-900 p-6
              transition duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-ink-800">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl
                bg-white text-black transition duration-300 group-hover:scale-105">
                {item.icon}
              </div>
              <h3 className="mt-6 text-lg font-semibold text-white">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-300">
                {item.description}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export default CoreExpertiseSection