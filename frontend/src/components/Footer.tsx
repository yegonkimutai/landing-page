import {
  siLinkerd,
  siX,
  siGithub,
  siInstagram,
} from "simple-icons/icons";

const quickLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Contact", href: "#contact" },
];

const services = [
  "Web Development",
  "Mobile App Development",
  "Cloud Solutions",
  "UI/UX Design",
  "Digital Strategy",
];

const socialLinks = [
  {
    name: "LinkedIn",
    href: "#",
    icon: siLinkerd,
  },
  {
    name: "X",
    href: "#",
    icon: siX,
  },
  {
    name: "GitHub",
    href: "#",
    icon: siGithub,
  },
  {
    name: "Instagram",
    href: "#",
    icon: siInstagram,
  },
];

function BrandIcon({
  icon,
  name,
}: {
  icon: { path: string };
  name: string;
}) {
  return (
    <svg
      role="img"
      aria-label={name}
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="currentColor"
    >
      <path d={icon.path} />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#01060d] text-white">
      {/* Main Footer */}
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {/* Company */}
        <div>
          <img
            src="/images/webdevv-logo.png"
            alt="WEBDEVV"
            className="h-10 w-auto"
          />

          <p className="mt-5 max-w-xs text-sm leading-6 text-gray-500">
            WEBDEVV is a digital innovation company passionate about building
            solutions that drive growth and create impact.
          </p>

          {/* Social Links */}
          <div className="mt-6 flex gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                aria-label={social.name}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-gray-400 transition-all duration-300 hover:border-cyan-400 hover:bg-cyan-400/10 hover:text-cyan-400"
              >
                <BrandIcon icon={social.icon} name={social.name} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-white">Quick Links</h3>

          <ul className="mt-5 space-y-3">
            {quickLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="text-sm text-gray-500 transition-colors hover:text-cyan-400"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="font-semibold text-white">Services</h3>

          <ul className="mt-5 space-y-3">
            {services.map((service) => (
              <li key={service}>
                <span className="text-sm text-gray-500">{service}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold text-white">Contact Info</h3>

          <div className="mt-5 space-y-3 text-sm text-gray-500">
            <p>
              <a
                href="mailto:hello@webdevv.com"
                className="transition-colors hover:text-cyan-400"
              >
                hello@webdevv.com
              </a>
            </p>

            <p>
              <a
                href="tel:+254700123456"
                className="transition-colors hover:text-cyan-400"
              >
                +254 700 123 456
              </a>
            </p>

            <p>Nairobi, Kenya</p>

            <p>Mon - Fri: 9AM - 6PM</p>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-5 text-xs text-gray-600 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>© 2026 WEBDEVV. All rights reserved.</p>

          <div className="flex gap-6">
            <a
              href="#"
              className="transition-colors hover:text-gray-300"
            >
              Privacy Policy
            </a>

            <a
              href="#"
              className="transition-colors hover:text-gray-300"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
