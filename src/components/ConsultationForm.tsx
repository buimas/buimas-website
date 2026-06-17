import { useState } from "react"
import type { FormEvent } from "react"
import toast from "react-hot-toast"

// Web3Forms access key — safe to expose in client-side code.
// Get yours free at https://web3forms.com (sign up with the company email).
const WEB3FORMS_ACCESS_KEY = "137b29f6-6914-44a8-906c-6982034f74cb"

const topics = ["Hire Engineers", "Product Development", "Technical Consulting"]

const ConsultationForm = () => {
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    formData.append("access_key", WEB3FORMS_ACCESS_KEY)
    formData.append("subject", "New consultation request — Buimas")

    setSubmitting(true)
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      })
      const data = await response.json()

      if (data.success) {
        toast.success("Request sent successfully. We'll get back to you shortly.")
        form.reset()
      } else {
        toast.error("Something went wrong. Please try again.")
      }
    } catch {
      toast.error("Network error. Please check your connection and try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="rounded-2xl border border-ink-100 bg-white p-6 shadow-sm md:p-8">
      <h3 className="text-lg font-semibold text-ink-900">Send us a message</h3>
      <p className="mt-1 text-sm text-ink-500">We'll reply with next steps and a calendar invite.</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        {/* Honeypot — hidden from real users, catches bots */}
        <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="firstName" className="text-sm text-ink-700">First name</label>
            <input id="firstName" type="text" name="firstName" placeholder="Jane" required className="mt-2 w-full rounded-lg border border-ink-200 px-4 py-3 text-sm outline-none transition focus:border-ink-900" />
          </div>
          <div>
            <label htmlFor="lastName" className="text-sm text-ink-700">Last name</label>
            <input id="lastName" type="text" name="lastName" placeholder="Doe" required className="mt-2 w-full rounded-lg border border-ink-200 px-4 py-3 text-sm outline-none transition focus:border-ink-900" />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="text-sm text-ink-700">Email address</label>
          <input id="email" type="email" name="email" placeholder="jane@email.com" required className="mt-2 w-full rounded-lg border border-ink-200 px-4 py-3 text-sm outline-none transition focus:border-ink-900" />
        </div>

        <div>
          <label htmlFor="topic" className="text-sm text-ink-700">What do you need help with?</label>
          <select id="topic" name="topic" required defaultValue="" className="mt-2 w-full rounded-lg border border-ink-200 px-4 py-3 text-sm outline-none transition focus:border-ink-900">
            <option value="" disabled>Select a topic</option>
            {topics.map((topic) => (
              <option key={topic} value={topic}>{topic}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="projectDetails" className="text-sm text-ink-700">Tell us a bit about your project</label>
          <textarea id="projectDetails" name="projectDetails" rows={4} required placeholder="Briefly describe your goals or current challenges." className="mt-2 w-full rounded-lg border border-ink-200 px-4 py-3 text-sm outline-none transition focus:border-ink-900" />
        </div>

        <button type="submit" disabled={submitting} className="w-full rounded-lg bg-ink-950 py-4 text-sm font-medium text-white transition hover:bg-ink-800 disabled:cursor-not-allowed disabled:opacity-60">
          {submitting ? "Sending…" : "Request consultation"}
        </button>
      </form>
    </div>
  )
}

export default ConsultationForm