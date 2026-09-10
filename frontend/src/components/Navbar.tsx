import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from '../assets/images/webdevv-logo.svg'

const links = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Portfolio', href: '#portfolio' },
  { name: 'Why Us', href: '#why-us' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#020812]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">

        {/*Logo*/}
        <a href="#home">
          <img
            src={logo}
            alt='WEBDEVV LOGO'
            className="h-10 w-auto brightness-0 invert"
          />
        </a>

        {/*Navigation*/}
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/*CTA*/}
        <a
          href="#contact"
          className="hidden rounded-lg bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 md:block"
        >
          Get In Touch
        </a>

        {/*Mobile Button*/}
        <button
          onClick={() => setOpen(!open)}
          className="text-white md:hidden"
          aria-label="Toggle navigation"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/*Mobile Navigation*/}
      {open && (
        <div className="border-t border-white/5 bg-[#020812] px-5 py-6 md:hidden">
          <nav className="flex flex-col gap-5">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-gray-300 hover:text-cyan-400"
              >
                {link.name}
              </a>
            ))}

            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-lg bg-cyan-400 px-5 py-3 text-center font-semibold text-slate-950"
            >
              Get In Touch
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
