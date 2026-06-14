import emailIcon from "../assets/images/mail.svg"
import ConsultationForm from "./ConsultationForm"
import Reveal from "./Reveal"

const reasons = [
  {
    title: "Senior Engineers Only",
    text: "You talk directly to the engineers building your system, not account managers.",
  },
  {
    title: "24/7 Response Time",
    text: "We respect your timeline with quick turnaround on every technical enquiry.",
  },
  {
    title: "Vendor Agnostic",
    text: "We recommend the best stack for your needs (AWS, Azure, GCP) — not what pays us commission.",
  },
]

const ContactSection = () => {
  return (
    <section className="w-full bg-white px-6 md:px-10 lg:px-[100px] py-24 md:py-32">
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-20">
        {/* LEFT */}
        <Reveal>
          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-ink-400">Get in touch</p>
            <h2 className="mt-3 text-3xl font-semibold text-ink-900 md:text-4xl">Ready to build your solution?</h2>
            <p className="mt-4 max-w-xl text-ink-500">Book a free technical discovery call. No sales fluff — just engineering. We sign NDAs before every consultation.</p>

            <div className="mt-12 space-y-6">
              {reasons.map((reason) => (
                <div key={reason.title} className="flex gap-4">
                  <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-ink-900" />
                  <div>
                    <h3 className="font-medium text-ink-900">{reason.title}</h3>
                    <p className="mt-1 text-sm text-ink-500">{reason.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 max-w-sm rounded-2xl border border-ink-100 bg-ink-50 p-6">
              <h3 className="font-medium text-ink-900">Contact details</h3>
              <div className="mt-4 space-y-3 text-sm text-ink-600">
                <a href="mailto:info@buimas.com" className="flex items-center gap-2 transition hover:text-ink-900">
                  <img src={emailIcon} alt="" className="h-4 w-4" />
                  info@buimas.com
                </a>
                <a href="tel:+2349068563605" className="flex items-center gap-2 transition hover:text-ink-900">
                  <span aria-hidden="true">📞</span>
                  +234 906 856 3605, +234 916 767 4015
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        {/* RIGHT */}
        <Reveal delay={0.1}>
          <ConsultationForm />
        </Reveal>
      </div>
    </section>
  )
}

export default ContactSection