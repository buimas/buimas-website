import emailIcon from "../assets/images/mail.svg"
import toast from "react-hot-toast"


const ContactSection = () => {
  return (
    <section className="w-full bg-white px-6 md:px-10 lg:px-[100px] py-32">
      <div className="grid grid-cols-1 gap-20 lg:grid-cols-2">
        {/* LEFT CONTENT */}
        <div>
          <h2 className="text-3xl font-semibold text-gray-900">
            Ready To Build Your Solution?
          </h2>

          <p className="mt-4 max-w-xl text-gray-600">
            Book a free technical discovery call. No sales fluff, just
            engineering solutions. We sign NDAs before every consultation.
          </p>

          {/* Why work with Buimas */}
          <div className="mt-12">
            <h3 className="text-lg font-semibold text-gray-900">
              Why work with Buimas?
            </h3>

            <div className="mt-6 space-y-6">
              <div>
                <h4 className="font-medium text-gray-900">
                  Senior Engineers Only
                </h4>
                <p className="mt-1 text-sm text-gray-600">
                  You talk directly to competent engineers building your
                  system, not account managers.
                </p>
              </div>

              <div>
                <h4 className="font-medium text-gray-900">
                  24/7 Response Time
                </h4>
                <p className="mt-1 text-sm text-gray-600">
                  We respect your timeline. Quick turnaround on all technical
                  enquiries. No technical debt.
                </p>
              </div>

              <div>
                <h4 className="font-medium text-gray-900">
                  Vendor Agnostic
                </h4>
                <p className="mt-1 text-sm text-gray-600">
                  We recommend the best stack for your needs (AWS, Azure,
                  GCP), not what pays us commission.
                </p>
              </div>
            </div>
            </div>
                {/* Contact details */}
                <div className="mt-12 max-w-sm rounded-xl border border-gray-200 bg-gray-50 p-6">
                <h4 className="font-medium text-gray-900">
                Contact Details
                </h4>

                <div className="mt-4 space-y-3 text-sm text-gray-700">
                {/* Email */}
                <a
                href="mailto:info@buimas.com"
                className="flex items-center gap-2 hover:text-gray-900 transition"
                >
                <img
                src={emailIcon}
                alt="Email icon"
                className="h-4 w-4 text-gray-700"
                />
              info@buimas.com
                </a>
                {/* Phone */}
                <a
                href="tel:+2349068563605"
                className="flex items-center gap-2 hover:text-gray-900 transition"
                >
                <span>📞</span>
                     +2349068563605, +2349167674015
                </a>
            </div>
        </div>
    </div>

        {/* RIGHT FORM */}
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          {/* Tabs */}
          <div className="mb-8 flex border-b border-gray-200">
            <button className="flex-1 border-b-2 border-gray-900 pb-3 text-sm font-medium text-gray-900">
              Send a message
            </button>
            <button className="flex-1 pb-3 text-sm text-gray-500">
              Direct Calendar Booking
            </button>
          </div>

          {/* Form */}
          <form
            onSubmit={async (e) => {
                e.preventDefault()

                const form = e.currentTarget
                const formData = new FormData(form)

                const response = await fetch("https://formspree.io/f/xeeeqwnb", {
                method: "POST",
                body: formData,
                headers: {
                    Accept: "application/json",
                },
                })

                if (response.ok) {
                toast.success("Request sent successfully. We’ll get back to you shortly.")
                form.reset()
                } else {
                toast.error("Something went wrong. Please try again.")
                }
            }}
            className="mt-6 space-y-5"
            >


            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Jane"
                    required
                  className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-gray-900"
                />
              </div>

              <div>
                <label className="text-sm text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Doe"
                    required
                  className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-gray-900"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                name="email address"
                 required
                placeholder="janedoe@email.com"
                className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-gray-900"
              />
              <p className="mt-2 text-xs text-gray-500">
                We will send the calendar invite here.
              </p>
            </div>

            <div>
              <label className="text-sm text-gray-700">
                What do you need help with?
              </label>
              <select 
                name="topic"
                    required
                className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-gray-900">
                <option>Select a topic</option>
                <option>Hire Engineers</option>
                <option>Product Develpment</option>
                <option>Technical Consulting</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-gray-700">
                Tell us a bit about your project
              </label>
              <textarea
               name="projectDetails"
                rows={4}
                required
                placeholder="Briefly describe your project goals or current infrastructure challenges."
                className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-gray-900"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-gray-900 py-4 text-sm font-medium text-white hover:bg-gray-800 transition"
            >
              Request Consultation
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
