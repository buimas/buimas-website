import talentIcon from "../assets/images/group.svg"
import consultingIcon from "../assets/images/consult.svg"
import transformationIcon from "../assets/images/transform.svg"


  const expertise = [
  {
    title: "Custom Software Development",
    description:
      "Custom applications built for high performance, security, and scale using modern frameworks.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.5 7.5L19.5 12L16.5 16.5M7.5 16.5L4.5 12L7.5 7.5M14 4L10 20"
        />
      </svg>
    ),
  },
  {
    title: "Tech Talent Outsourcing",
    description:
      "Elite engineering teams integrated seamlessly into your existing workflow to boost velocity.",
    icon: (
      <img
        src={talentIcon}
        alt="Tech Talent Outsourcing"
        className="h-6 w-6"
      />
    ),
  },
  {
    title: "Technical Consulting",
    description:
      "Strategic roadmaps to modernize legacy infrastructure and drive digital innovation.",
    icon: (
      <img
        src={consultingIcon}
        alt="Technical Consulting"
        className="h-6 w-6"
      />
    ),
  },
  {
    title: "Digital Transformation",
    description:
      "Modernizing legacy systems. We help you pivot from outdated tech to cutting-edge solutions.",
    icon: (
      <img
        src={transformationIcon}
        alt="Digital Transformation"
        className="h-6 w-6"
      />
    ),
  },
]

const CoreExpertiseSection = () => {
  return (
    <section className="mt-14 w-full bg-neutral-900 px-6 md:px-10 lg:px-[100px] py-24">
      {/* Header */}
      <div className="max-w-3xl">
        <h2 className="text-2xl font-semibold text-white">
          Our Core Expertise
        </h2>

        <p className="mt-4 text-white/70">
          We deliver end-to-end technology services tailored to your business
          needs, from custom development to strategic talent integration.
        </p>
      </div>

      {/* Expertise items */}
      <div className="relative mt-20">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-4">
          {expertise.map((item) => (
            <div key={item.title} className="relative">
              {/* Icon */}
              <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-xl bg-white text-black">
                {item.icon}
              </div>

              {/* Content */}
              <h3 className="mt-6 text-lg font-semibold text-white">
                {item.title}
              </h3>

              <p className="mt-3 text-sm text-white/70">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CoreExpertiseSection