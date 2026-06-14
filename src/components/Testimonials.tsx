import Reveal from "./Reveal"

type Testimonial = {
  quote: string
  name: string
  role: string
}

// PLACEHOLDERS — replace with real, attributed client quotes before launch.
const testimonials: Testimonial[] = [
  {
    quote:
      "Building a community-driven commerce platform required a technology partner that understood both innovation and execution. Their team consistently delivered scalable solutions, exceptional product thinking, and a level of technical expertise that exceeded our expectations. From architecture to user experience, they became an extension of our team and played a key role in bringing our vision to life.",
    name: "Joanna Kolo",
    role: "Founder, Mowo Africa",
  },
  {
    quote:
      "What impressed us most was their ability to transform complex business requirements into simple, intuitive digital experiences. Their engineering standards, attention to detail, and commitment to delivering on schedule made them a trusted technology partner. We look forward to building many more products together.",
    name: "Ayobami Paul",
    role: "CEO, Kajewa Ltd",
  },
  {
    quote:
      "Working with this team has been one of the best technology decisions we've made. They combine strategic product thinking with world-class engineering to deliver a solution that is secure, scalable, and built for growth. Their professionalism and dedication have helped accelerate our digital transformation journey.",
    name: "Sule Wisdom",
    role: "CEO, CyclexAfrica",
  },
]

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()

const Testimonials = () => {
  return (
    <section className="w-full bg-ink-50 px-6 md:px-10 lg:px-[100px] py-24 md:py-32">
      <Reveal>
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-wider text-ink-400">Testimonials</p>
          <h2 className="mt-3 text-3xl font-semibold text-ink-900 md:text-4xl">What our clients say</h2>
        </div>
      </Reveal>

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <Reveal key={index} delay={index * 0.1}>
            <figure className="flex h-full flex-col rounded-2xl border border-ink-100 bg-white p-8">
              <blockquote className="flex-1 leading-relaxed text-ink-700">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4">
                <div className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-ink-950 text-sm font-medium text-white">
                  {getInitials(testimonial.name)}
                </div>
                <div>
                  <p className="font-medium text-ink-900">{testimonial.name}</p>
                  <p className="text-sm text-ink-500">{testimonial.role}</p>
                </div>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export default Testimonials