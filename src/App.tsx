import { Routes, Route } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { Toaster } from "react-hot-toast"
import ScrollToTop from "./components/ScrollToTop"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import About from "./pages/About"
import HireTalent from "./components/HireTalent"
import Privacy from "./pages/Privacy"
import NotFound from "./pages/NotFound"

const App = () => {
  return (
    <>
      <Helmet
        defaultTitle="Buimas — Custom Software Development & Engineering Talent"
        titleTemplate="%s · Buimas"
      >
        <meta name="description" content="Buimas designs, builds, and scales reliable software products — and embeds senior engineering talent into your team." />
        <meta property="og:title" content="Buimas — Custom Software Development & Engineering Talent" />
        <meta property="og:description" content="We design, build, and scale reliable software products with world-class engineering talent." />
      </Helmet>
      <Toaster position="top-right" />
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/hire-talent" element={<HireTalent />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App