import { Mail, MapPin, Phone, Clock } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-2 lg:px-8">

        {/* Contact information */}
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
            Contact Us
          </p>

          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Let's build something great together.
          </h2>

          <p className="mt-5 max-w-lg leading-7 text-gray-400">
            Have a project in mind? Tell us what you're building and our team
            will get back to you.
          </p>

          <div className="mt-8 space-y-5">
            <div className="flex items-center gap-4">
              <Mail className="text-cyan-400" size={20} />
              <span className="text-gray-300">hello@webdevv.com</span>
            </div>

            <div className="flex items-center gap-4">
              <Phone className="text-cyan-400" size={20} />
              <span className="text-gray-300">+254 700 123 456</span>
            </div>

            <div className="flex items-center gap-4">
              <MapPin className="text-cyan-400" size={20} />
              <span className="text-gray-300">Nairobi, Kenya</span>
            </div>

            <div className="flex items-center gap-4">
              <Clock className="text-cyan-400" size={20} />
              <span className="text-gray-300">Mon - Fri: 9AM - 6PM</span>
            </div>
          </div>
        </div>

        {/* Form */}
        <form className="rounded-2xl border border-white/10 bg-white/2 p-6 sm:p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm text-gray-400">
                Your Name
              </label>

              <input
                type="text"
                placeholder="John Doe"
                className="w-full rounded-lg border border-white/10 bg-white/3 px-4 py-3 text-sm outline-none transition placeholder:text-gray-600 focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-400">
                Your Email
              </label>

              <input
                type="email"
                placeholder="john@example.com"
                className="w-full rounded-lg border border-white/10 bg-white/3 px-4 py-3 text-sm outline-none transition placeholder:text-gray-600 focus:border-cyan-400"
              />
            </div>
          </div>

          <div className="mt-5">
            <label className="mb-2 block text-sm text-gray-400">
              Subject
            </label>

            <input
              type="text"
              placeholder="How can we help?"
              className="w-full rounded-lg border border-white/10 bg-white/3 px-4 py-3 text-sm outline-none transition placeholder:text-gray-600 focus:border-cyan-400"
            />
          </div>

          <div className="mt-5">
            <label className="mb-2 block text-sm text-gray-400">
              Your Message
            </label>

            <textarea
              rows={5}
              placeholder="Tell us about your project..."
              className="w-full resize-none rounded-lg border border-white/10 bg-white/3 px-4 py-3 text-sm outline-none transition placeholder:text-gray-600 focus:border-cyan-400"
            />
          </div>

          <button
            type="submit"
            className="mt-5 w-full rounded-lg bg-cyan-400 px-5 py-3.5 font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
