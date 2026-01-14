const steps = [
  {
    id: 1,
    title: "Discover & Plan",
    description:
      "We start by deep-diving into your business goals. This phase focuses on requirement gathering, technical audits, and defining a clear roadmap to ensure we build exactly what you need.",
    tags: ["Tech Audit", "Roadmap", "User Stories"],
    image: "/images/process-discover.png",
    color: "bg-blue-600",
    align: "left",
  },
  {
    id: 2,
    title: "Design & Build",
    description:
      "Our team works in iterative sprints. We combine intuitive UI/UX design with clean, scalable code architecture to bring your product to life efficiently without technical debt.",
    tags: ["Iterative Sprints", "UI/UX", "Clean Code"],
    image: "/images/process-design.png",
    color: "bg-green-700",
    align: "right",
  },
  {
    id: 3,
    title: "Test & Launch",
    description:
      "We don’t just ship, we verify. Through rigorous QA and UAT testing, we ensure a seamless deployment that performs under pressure.",
    tags: ["QA Automation", "UAT", "CI/CD"],
    image: "/images/process-test.png",
    color: "bg-red-700",
    align: "left",
  },
  {
    id: 4,
    title: "Scale & Support",
    description:
      "Launch is just the beginning. We support your growth with proactive maintenance, feature iterations, and cloud infrastructure scaling as your user base expands.",
    tags: ["Maintenance", "Cloud Scaling", "Iterations"],
    image: "/images/process-scale.png",
    color: "bg-yellow-700",
    align: "right",
  },
]

const ProcessSection = () => {
  return (
    <section
      className="
        relative w-full
        mt-10
        py-32
        bg-white
      "
    >
      <h2
        className="
          mb-24
          pl-[100px]
          text-2xl
          font-semibold
          text-gray-900
        "
      >
        Our Process
      </h2>

      <div className="relative px-6 md:px-10 lg:px-[100px]">
        {/* Vertical timeline line */}
        <div
          className="
            absolute
            left-1/2
            top-8
            bottom-8
            hidden
            w-px
            -translate-x-1/2
            bg-gray-200
            md:block
          "
        />

        {/* Steps */}
        <div className="flex flex-col gap-24">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`relative flex flex-col md:flex-row items-center gap-12 ${
                step.align === "left"
                  ? "md:flex-row"
                  : "md:flex-row-reverse"
              }`}
            >
              {/* Step indicator */}
              <div
                className={`absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 hidden md:flex h-8 w-8 items-center justify-center rounded-full text-white text-sm font-semibold ${step.color}`}
              >
                {step.id}
              </div>

              {/* Text content */}
              <div
                className={`
                  md:w-1/2
                  text-center md:text-left
                  px-6 md:px-10
                  ${
                    step.align === "left"
                      ? "lg:pl-[200px] lg:pr-[200px]"
                      : "lg:pl-[2px] lg:pr-[200px]"
                  }
                `}
              >
                <h3 className="text-xl font-semibold text-gray-900">
                  {step.title}
                </h3>

                <p className="mt-4 text-gray-600">
                  {step.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2 justify-center md:justify-start">
                  {step.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-gray-200 px-3 py-1 text-xs text-gray-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Image */}
              <div className="md:w-1/2 flex justify-center">
                <img
                  src={step.image}
                  alt={step.title}
                  className="max-w-xs"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProcessSection
