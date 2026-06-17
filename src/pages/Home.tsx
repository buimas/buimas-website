import { Helmet } from "react-helmet-async"
import Hero from "../components/Hero"
import CoreExpertiseSection from "../components/CoreExpertiseSection"
import ProcessSection from "../components/ProcessSection"
import FeaturedWork from "../components/FeaturedWork"
import Testimonials from "../components/Testimonials"
import FAQ from "../components/FAQ"
import ContactSection from "../components/ContactSection"

const Home = () => {
  return (
    <>
    <Helmet>
      <meta property="og:url" content="https://www.buimas.com/" />
      <link rel="canonical" href="https://www.buimas.com/" />
    </Helmet>
      <Hero />
      <CoreExpertiseSection />
      <ProcessSection />
      <FeaturedWork />
      <Testimonials />
      <FAQ />
      <ContactSection />
    </>
  )
}

export default Home