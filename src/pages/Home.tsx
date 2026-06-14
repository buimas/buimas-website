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