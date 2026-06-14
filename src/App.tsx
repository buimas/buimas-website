import { BrowserRouter, Routes, Route } from "react-router-dom"
import ScrollToTop from "./components/ScrollToTop"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import About from "./pages/About"
import Footer from "./components/Footer"
import HireTalent from "./components/HireTalent"
import Privacy from "./pages/Privacy"
import NotFound from "./pages/NotFound"

function App() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  )
}

export default App