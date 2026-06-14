import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Link } from "react-router-dom"
import Reveal from "./Reveal"

const faqs = [
  {
    question: "What services does Buimas offer?",
    answer:
      "We build custom software end to end, outsource senior engineering talent to extend your team, provide technical consulting and architecture, and lead digital transformation for businesses modernising legacy systems.",
  },
  {
    question: "How do we get started?",
    answer:
      "It starts with a free discovery call — no sales fluff, just engineering. We learn your goals, then move through our four-step process: discover and plan, design and build, test and launch, then scale and support.",
  },
  {
    question: "How long will my project take?",
    answer:
      "It depends on scope and complexity, so we give you a realistic timeline after the discovery phase rather than a guess up front. Most engagements run in two-week sprints, so you see progress continuously.",
  },
  {
    question: "How much will it cost?",
    answer:
      "Every project is scoped individually, so there is no one-size price. Book a discovery call and we will give you a clear, transparent estimate based on what you actually need — with no hidden costs.",
  },
  {
    question: "Do you sign NDAs?",
    answer:
      "Yes. We sign an NDA before every consultation, so you can share your idea and infrastructure details with complete confidence.",
  },
  {
    question: "Do you provide support after launch?",
    answer:
      "Launch is just the beginning. We offer proactive maintenance, feature iterations, and infrastructure scaling as your user base grows.",
  },
]

const FAQ = () => {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="w-full bg-white px-6 md:px-10 lg:px-[100px] py-24 md:py-32">
      <div className="grid gap-12 lg:grid-cols-3 lg:gap-16">
        {/* Left — heading */}
        <Reveal>
          <div className="lg:sticky lg:top-28">
            <p className="text-sm font-medium uppercase tracking-wider text-ink-400">FAQ</p>
            <h2 className="mt-3 text-3xl font-semibold text-ink-900 md:text-4xl">Frequently asked questions</h2>
            <p className="mt-4 text-ink-500">Can't find what you're looking for?</p>
            <Link to="/hire-talent" className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-ink-900 underline underline-offset-4 transition hover:text-ink-600">
              Get in touch →
            </Link>
          </div>
        </Reveal>

        {/* Right — accordion */}
        <div className="lg:col-span-2">
          <div className="border-t border-ink-100">
            {faqs.map((faq, index) => {
              const isOpen = open === index
              return (
                <Reveal key={index} delay={index * 0.05}>
                  <div className="border-b border-ink-100">
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : index)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-4 py-6 text-left"
                    >
                      <span className="text-lg font-medium text-ink-900">{faq.question}</span>
                      <span className={`flex-none text-2xl leading-none text-ink-400 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}>
                        +
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen ? (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                          className="overflow-hidden"
                        >
                          <p className="pb-6 leading-relaxed text-ink-500">{faq.answer}</p>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default FAQ