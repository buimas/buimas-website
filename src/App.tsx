import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import About from "./pages/About"
import Footer from "./components/Footer"
import HireTalent from "./components/HireTalent"

function App() {
  return (
    <BrowserRouter>
      {/* Persistent Navigation */}
      <Navbar />

      {/* Page Content */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/hire-talent" element={<HireTalent />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  )
}

export default App
