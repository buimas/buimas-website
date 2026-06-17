import { Helmet } from "react-helmet-async"
import ContactSection from "./ContactSection"

const HireTalent = () => {
  return (
    <main className="pt-8 md:pt-12">
      <Helmet>
        <title>Hire Talent</title>
        <meta name="description" content="Extend your team with senior Buimas engineers, integrated into your workflow to help you ship faster." />
        <meta property="og:title" content="Hire Engineering Talent · Buimas" />
        <meta property="og:description" content="Extend your team with senior Buimas engineers, integrated into your workflow to help you ship faster." />
        <meta property="og:url" content="https://www.buimas.com/hire-talent" />
        <link rel="canonical" href="https://www.buimas.com/hire-talent" />
      </Helmet>
      <ContactSection />
    </main>
  )
}

export default HireTalent
/* Comment it */