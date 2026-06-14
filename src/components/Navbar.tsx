import { NavLink, Link, useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import logo from "../assets/images/logo.png"

const navLinks = [
  { to: "/about", label: "About" },
  { to: "/hire-talent", label: "Hire Talent" },
]

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === "/"

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Close the mobile menu whenever the route changes
  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  const solid = !isHome || scrolled

  return (
    <header className="fixed top-0 left-0 z-50 w-full">
      <div className="px-4 sm:px-6">
        <nav className={`mx-auto mt-6 flex max-w-7xl items-center justify-between rounded-full border border-white/10 px-4 py-4 backdrop-blur-md transition-colors duration-300 sm:px-6 md:px-8 ${solid ? "bg-black/60" : "bg-white/5"}`}>
          {/* Logo */}
          <Link to="/" className="flex items-center" aria-label="Buimas home">
            <img src={logo} alt="Buimas logo" className="h-6 w-auto sm:h-7 md:h-8" />
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-8 text-sm text-white/80 md:flex">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `transition hover:text-white ${isActive ? "text-white" : ""}`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <Link
            to="/hire-talent"
            className={`hidden rounded-full px-5 py-2.5 text-sm font-medium transition md:block ${solid ? "bg-white text-black hover:bg-white/90" : "border border-white/20 bg-white/10 text-white backdrop-blur-md hover:bg-white/20"}`}
          >
            Start Your Project
          </Link>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="text-white md:hidden"
          >
            {open ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="mx-4 mt-4 rounded-2xl border border-white/10 bg-black/80 p-6 text-white backdrop-blur-md md:hidden">
          <ul className="flex flex-col gap-1 text-sm">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} className="block rounded-lg px-3 py-2.5 transition hover:bg-white/10">
                  {link.label}
                </NavLink>
              </li>
            ))}
            <li className="mt-3">
              <Link to="/hire-talent" className="block rounded-full bg-white px-4 py-2.5 text-center font-medium text-black">
                Start Your Project
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}

export default Navbar