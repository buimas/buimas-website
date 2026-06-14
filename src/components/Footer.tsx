import { Link } from "react-router-dom"
import logo from "../assets/images/logo.png"

import whatsappIcon from "../assets/images/whatsapp.png"
import instagramIcon from "../assets/images/instagram.png"
import linkedinIcon from "../assets/images/linkedin.png"
import xIcon from "../assets/images/x.png"

const socials = [
  { name: "WhatsApp", href: "https://wa.me/2349068563605", icon: whatsappIcon },
  { name: "Instagram", href: "https://www.instagram.com/buimas.agency", icon: instagramIcon },
  { name: "LinkedIn", href: "https://www.linkedin.com/company/buimas", icon: linkedinIcon },
  { name: "X", href: "https://x.com/buimas_agency", icon: xIcon },
]

const quickLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/hire-talent", label: "Hire Talent" },
]

const Footer = () => {
  return (
    <footer className="w-full bg-ink-950 text-white">
      <div className="px-6 md:px-10 lg:px-[100px] py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 lg:gap-16">
          {/* Brand */}
          <div>
            <img src={logo} alt="Buimas logo" className="h-8 w-auto" />
            <p className="mt-6 max-w-sm text-ink-400">
              Your trusted partner for custom software development, technical talent, and strategic consulting.
            </p>
            <p className="mt-6 text-sm text-ink-500">Open Monday – Friday</p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-medium uppercase tracking-wider text-ink-400">Contact</h4>
            <div className="mt-6 space-y-3 text-ink-300">
              <a href="mailto:info@buimas.com" className="block transition hover:text-white">
                info@buimas.com
              </a>
              <a href="tel:+2349068563605" className="block transition hover:text-white">
                +234 906 856 3605
              </a>
              <a href="tel:+2349167674015" className="block transition hover:text-white">
                +234 916 767 4015
              </a>
            </div>

            <div className="mt-6 flex items-center gap-3">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition hover:border-white/30 hover:bg-white/5"
                >
                  <img src={social.icon} alt="" className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-medium uppercase tracking-wider text-ink-400">Quick Links</h4>
            <ul className="mt-6 space-y-3 text-ink-300">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="transition hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="px-6 md:px-10 lg:px-[100px] py-6">
          <div className="flex flex-col gap-3 text-sm text-ink-500 md:flex-row md:items-center md:justify-between">
            <span>© {new Date().getFullYear()} Buimas Solutions. All rights reserved.</span>
            <Link to="/privacy" className="transition hover:text-white">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer