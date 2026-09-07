import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "WEBDEVV delivered beyond our expectations. Their attention to detail and professionalism is top-notch.",
    name: "Michael Tan",
    role: "CEO, Cloudforce",
  },
  {
    quote:
      "Their team is highly skilled, responsive, and truly cares about the success of our product.",
    name: "Sarah Johnson",
    role: "Founder, Kanba",
  },
  {
    quote:
      "From design to development, WEBDEVV made the entire process smooth and stress-free.",
    name: "David Okoro",
    role: "CTO, Avenue",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-[#030d18] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
            Testimonials
          </p>

          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            What Our Clients Say
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="rounded-xl border border-white/10 bg-white/2 p-7"
            >
              <Quote className="text-cyan-400" size={30} />

              <p className="mt-5 text-sm leading-7 text-gray-400">
                "{testimonial.quote}"
              </p>

              <div className="mt-7 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-400/10 text-sm font-bold text-cyan-400">
                  {testimonial.name.charAt(0)}
                </div>

                <div>
                  <h4 className="text-sm font-semibold">
                    {testimonial.name}
                  </h4>

                  <p className="text-xs text-gray-500">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
