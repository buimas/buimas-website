import { Helmet } from "react-helmet-async"

const Privacy = () => {
  return (
    <main className="w-full bg-white px-6 md:px-10 lg:px-[100px] pt-36 pb-24">
      <Helmet>
        <title>Privacy Policy</title>
        <meta name="description" content="How Buimas collects, uses, and protects your information." />
        <meta property="og:url" content="https://www.buimas.com/privacy" />
        <link rel="canonical" href="https://www.buimas.com/privacy" />
      </Helmet>
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-medium uppercase tracking-wider text-ink-400">Legal</p>
        <h1 className="mt-3 text-4xl font-semibold text-ink-900 md:text-5xl">Privacy Policy</h1>
        <p className="mt-4 text-sm text-ink-500">Last updated: 2026-06-14</p>

        <div className="mt-12 space-y-10 leading-relaxed text-ink-600">
          <p>
            This Privacy Policy explains how Buimas Solutions ("Buimas", "we", "us", or "our")
            collects, uses, and protects your personal information when you visit www.buimas.com
            or get in touch with us. We are committed to handling your data responsibly and in line
            with the Nigeria Data Protection Act (NDPA) 2023 and other applicable laws.
          </p>

          <section>
            <h2 className="text-xl font-semibold text-ink-900">1. Information we collect</h2>
            <p className="mt-3">
              When you submit our contact or consultation form, we collect the information you choose
              to provide; typically your name, email address, and details about your project. If you
              reach out by email, phone, or social media, we collect whatever information those
              messages contain.
            </p>
            <p className="mt-3">
              We may also automatically collect limited technical information, such as your browser
              type, device, and the pages you visit, to understand how the site is used.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-ink-900">2. How we use your information</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>To respond to your enquiries and provide the services you request.</li>
              <li>To communicate with you about your project, proposals, or scheduling.</li>
              <li>To operate, maintain, and improve our website.</li>
              <li>To comply with our legal and regulatory obligations.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-ink-900">3. How we share your information</h2>
            <p className="mt-3">
              We do not sell your personal information. We share it only with trusted service
              providers who help us run our website and respond to you, including:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>Formspree, which processes our contact-form submissions.</li>
              <li>Vercel, which hosts and serves our website.</li>
              <li>Google Fonts, which delivers the typography used on the site.</li>
            </ul>
            <p className="mt-3">
              These providers may process data outside Nigeria. We may also disclose information where
              required by law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-ink-900">4. Cookies and tracking</h2>
            <p className="mt-3">
                Buimas does not use cookies for advertising, profiling, or cross-site tracking,
                and we do not currently run analytics tools that store cookies on your device.
                The third-party services that power this site, our form provider (Formspree)
                and font delivery (Google Fonts), may receive standard technical request data,
                such as your IP address, when those features load or are used, but we do not use
                this to track you across the web. You can block or delete cookies at any time
                through your browser settings.
            </p>
            </section>

          <section>
            <h2 className="text-xl font-semibold text-ink-900">5. Data retention</h2>
            <p className="mt-3">
              We keep your personal information only for as long as needed to fulfil the purposes
              described in this policy, to maintain our business records, or to comply with the law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-ink-900">6. Your rights</h2>
            <p className="mt-3">
              Under the NDPA, you have the right to access the personal data we hold about you, to
              request correction or deletion, to object to or restrict its processing, to data
              portability, and to withdraw consent at any time. To exercise any of these rights,
              contact us using the details below.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-ink-900">7. Data security</h2>
            <p className="mt-3">
              We take reasonable technical and organisational measures to protect your information.
              However, no method of transmission or storage is completely secure, and we cannot
              guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-ink-900">8. Links to other websites</h2>
            <p className="mt-3">
              Our site may link to external websites, including the live projects in our portfolio.
              We are not responsible for the privacy practices of those sites and encourage you to
              review their policies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-ink-900">9. Changes to this policy</h2>
            <p className="mt-3">
              We may update this Privacy Policy from time to time. When we do, we will revise the
              "last updated" date above. We encourage you to review this page periodically.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-ink-900">10. Contact us</h2>
            <p className="mt-3">
              If you have any questions about this policy or how we handle your data, contact us at{" "}
              <a href="mailto:info@buimas.com" className="font-medium text-ink-900 underline underline-offset-4 hover:text-ink-600">
                info@buimas.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}

export default Privacy