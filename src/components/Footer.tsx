import { Link } from "react-router-dom"
import logo from "../assets/images/logo.png"

import whatsappIcon from "../assets/images/whatsapp.png"
import instagramIcon from "../assets/images/instagram.png"
import linkedinIcon from "../assets/images/linkedin.svg"
import xIcon from "../assets/images/x.png"

const socials = [
  {
    name: "WhatsApp",
    href: "https://wa.me/2349068563605",
    icon: whatsappIcon,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/buimas.agency",
    icon: instagramIcon,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/buimas",
    icon: linkedinIcon,
  },
  {
    name: "X",
    href: "https://x.com/buimas_agency",
    icon: xIcon,
  },
]

const Footer = () => {
  return (
    <footer className="w-full bg-neutral-900 text-white">
      {/* TOP SECTION */}
      <div className="px-6 md:px-10 lg:px-[100px] py-24">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-3">
          
          {/* BRAND */}
          <div>
            <img src={logo} alt="Buimas logo" className="h-8 w-auto" />

            <p className="mt-6 max-w-sm text-white/70">
              Your trusted partner for custom software development,
              technical talent, and strategic consulting.
            </p>

            <p className="mt-6 text-white/70">
              Open: Mon – Fri
            </p>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="text-lg font-semibold">
              Contact Us
            </h4>

            <div className="mt-6 space-y-4 text-white/70">
              <a
                href="mailto:info@buimas.com"
                className="block hover:text-white transition"
              >
                info@buimas.com
              </a>

              <a
                href="tel:+2349068563605"
                className="block hover:text-white transition"
              >
                +2349068563605, +2349167674015
              </a>
            </div>

            {/* SOCIAL ICONS */}
            <div className="mt-8 flex items-center gap-6">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="transition hover:opacity-70"
                >
                  <img
                    src={social.icon}
                    alt={social.name}
                    className="h-9 w-9 md:h-10 md:w-10"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 className="text-lg font-semibold">
              QuickLinks
            </h4>

            <ul className="mt-6 space-y-4 text-white/70">
              <li>
                <Link to="/about" className="hover:text-white transition">
                  About
                </Link>
              </li>
              <li>
                <Link to="/hire-talent" className="hover:text-white transition">
                  Start Your Project
                </Link>
              </li>
              <li>
                <Link to="/hire-talent" className="hover:text-white transition">
                  Hire Talent
                </Link>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* DIVIDER */}
      <div className="border-t border-white/20" />

      {/* BOTTOM BAR */}
      <div className="px-6 md:px-10 lg:px-[100px] py-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between text-sm text-white/60">
          <span>
            Privacy Policy
          </span>

          <span>
            © 2026 Buimas Solutions. All Rights Reserved
          </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer