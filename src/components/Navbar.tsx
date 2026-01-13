import { NavLink, Link, useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import logo from "../assets/images/logo.png"

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Detect current route
  const location = useLocation()
  const isHome = location.pathname === "/"

  // Scroll listener
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Decide when navbar should be solid
  const shouldBeSolid = !isHome || scrolled

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <div className="px-4 sm:px-6">
        <nav
          className={`
            mx-auto mt-6
            max-w-7xl
            flex items-center justify-between
            rounded-full
            px-4 sm:px-6 md:px-8
            py-4
            border border-white/10
            backdrop-blur-md
            transition-colors duration-300
            ${shouldBeSolid ? "bg-black/60" : "bg-white/5"}
          `}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              alt="Buimas logo"
              className="h-6 sm:h-7 md:h-8 w-auto"
            />
          </Link>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-8 text-sm text-white/80">
            <NavLink to="/about" className="hover:text-white transition">
              About
            </NavLink>
            <NavLink to="/hire-talent" className="hover:text-white transition">
              Hire Talent
            </NavLink>
            {/*<NavLink to="/academy" className="hover:text-white transition">
              Academy
            </NavLink>
            <NavLink to="/foundation" className="hover:text-white transition">
              Foundation
            </NavLink>*/}
          </ul>

          {/* CTA */}
          <div className="hidden md:block">
            <div className="hidden md:block">
                <Link
                    to="/hire-talent"
                    className={`
                    rounded-full
                    px-5 py-2.5
                    text-sm
                    font-medium
                    transition
                    ${
                        shouldBeSolid
                        ? "bg-white text-black hover:bg-white/90"
                        : "bg-white/10 text-white backdrop-blur-md border border-white/20 hover:bg-white/20"
                    }
                    `}
                >
                    Start Your Project
                </Link>
              </div>
            </div>


          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden mt-4 mx-4 rounded-2xl bg-black/70 backdrop-blur-md border border-white/10 p-6 text-white">
          <ul className="flex flex-col gap-4 text-sm">
            <NavLink to="/about" onClick={() => setOpen(false)}>
              About
            </NavLink>
            <NavLink to="/hire-talent" onClick={() => setOpen(false)}>
              Hire Talent
            </NavLink>
            {/*<NavLink to="/academy" onClick={() => setOpen(false)}>
              Academy
            </NavLink>
            <NavLink to="/foundation" onClick={() => setOpen(false)}>
              Foundation
            </NavLink>*/}

            <Link
                to="/hire-talent"
                onClick={() => setOpen(false)}
                className="mt-4 text-center rounded-full bg-white text-black px-4 py-2 text-sm font-medium"
                >
                Start Your Project
                </Link>

          </ul>
        </div>
      )}
    </header>
  )
}

export default Navbar