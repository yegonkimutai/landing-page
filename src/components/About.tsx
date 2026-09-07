import { CheckCircle2 } from "lucide-react";
import about from '../assets/images/about.jpg'

const benefits = [
  "Innovative and practical solutions",
  "Focused on quality and performance",
  "Long-term partnership and support",
];

export default function About() {
  return (
    <section id="about" className="py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-2 lg:px-8">

        {/* Image */}
        <div className="relative overflow-hidden rounded-2xl border border-white/10">
          <img
            src={about}
            alt="WEBDEVV team working"
            className="h-105 w-full object-cover"
          />

          <div className="absolute inset-0 bg-linear-to-t from-[#020812]/70 to-transparent" />
        </div>

        {/* Content */}
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
            About WEBDEVV
          </p>

          <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
            We Turn Ideas Into Powerful Digital Experiences
          </h2>

          <p className="mt-6 leading-7 text-gray-400">
            At WEBDEVV, we combine creativity, technology, and strategy to build
            digital products that stand out. Our team is passionate about
            solving complex problems and delivering measurable results.
          </p>

          <div className="mt-7 space-y-4">
            {benefits.map((benefit) => (
              <div key={benefit} className="flex items-center gap-3">
                <CheckCircle2 size={18} className="text-cyan-400" />
                <span className="text-sm text-gray-300">{benefit}</span>
              </div>
            ))}
          </div>

          <a
            href="#contact"
            className="mt-8 inline-block rounded-lg border border-cyan-400/40 px-6 py-3 text-sm font-semibold transition hover:bg-cyan-400 hover:text-slate-950"
          >
            Learn More About Us
          </a>
        </div>
      </div>
    </section>
  );
}
