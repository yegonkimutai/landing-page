import { ArrowRight, Play } from "lucide-react";
import hero from '../assets/images/Hero.jpg'

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28"
    >
      {/* Background glow */}
      <div className="absolute left-1/2 top-20 -z-10 h-125 w-125 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[120px]" />

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-2 lg:px-8">

        {/* Content */}
        <div>
          <span className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-cyan-400">
            Innovate. Build. Elevate.
          </span>

          <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Building Digital
            <br />
            Solutions That{" "}
            <span className="text-cyan-400">Drive the Future</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-gray-400 sm:text-lg">
            WEBDEVV is a digital innovation company focused on building
            powerful, scalable, and user-centric digital solutions that help
            businesses grow and succeed.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              href="#services"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-cyan-400 px-6 py-3.5 font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              Explore Our Services
              <ArrowRight size={18} />
            </a>

            <a
              href="#portfolio"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-cyan-400/40 px-6 py-3.5 font-semibold text-white transition hover:bg-cyan-400/10"
            >
              <Play size={17} />
              View Our Work
            </a>
          </div>

          {/* Trust */}
          <div className="mt-12">
            <p className="text-xs uppercase tracking-widest text-gray-500">
              Trusted by innovative companies
            </p>

            <div className="mt-5 flex flex-wrap gap-7 text-sm font-semibold text-gray-500">
              <span>cloudforce</span>
              <span>kanba</span>
              <span>amara</span>
              <span>aven.</span>
              <span>avenue</span>
            </div>
          </div>
        </div>

        {/* Hero Visual */}
        <div className="relative flex items-center justify-center">
          <div className="absolute h-72 w-72 rounded-full bg-cyan-400/20 blur-[100px]" />

          <div className="relative flex h-100 w-full items-center justify-center rounded-3xl border border-cyan-400/10 bg-linear-to-br from-cyan-400/5 to-transparent">
            <div className="absolute inset-10 rounded-full border border-cyan-400/10" />
            <div className="absolute inset-20 rounded-full border border-cyan-400/10" />

            <img
              src={hero}
              alt="WEBDEVV"
              className="relative z-10 w-90 object-contain drop-shadow-[0_0_35px_rgba(0,229,255,0.5)]"
            />

            <div className="absolute bottom-12 h-2 w-64 rounded-full bg-cyan-400/40 blur-md" />
          </div>
        </div>
      </div>
    </section>
  );
}
