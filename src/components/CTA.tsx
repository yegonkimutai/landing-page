import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="px-5 py-16 lg:px-8">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-2xl border border-cyan-400/50 bg-cyan-400/4 px-6 py-10 sm:px-10">

        <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">
              Ready to bring your ideas to life?
            </h2>

            <p className="mt-2 text-gray-400">
              Let's build something amazing together.
            </p>
          </div>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-lg bg-cyan-400 px-6 py-3.5 font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            Get Started Today
            <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
