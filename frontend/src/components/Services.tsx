import {
  Monitor,
  Smartphone,
  Cloud,
  Palette,
  TrendingUp,
} from "lucide-react";

const services = [
  {
    title: "Web Development",
    description:
      "Fast, responsive, and scalable web applications tailored to your business needs.",
    icon: Monitor,
  },
  {
    title: "Mobile App Development",
    description:
      "High-performance mobile apps for Android and iOS that users love.",
    icon: Smartphone,
  },
  {
    title: "Cloud Solutions",
    description:
      "Secure, reliable, and scalable cloud infrastructure and deployment.",
    icon: Cloud,
  },
  {
    title: "UI/UX Design",
    description:
      "Beautiful, intuitive, and user-centered designs that drive engagement.",
    icon: Palette,
  },
  {
    title: "Digital Strategy",
    description:
      "Data-driven strategies to help your business grow and stay ahead.",
    icon: TrendingUp,
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-[#030d18] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
            Our Services
          </p>

          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Solutions We Provide
          </h2>

          <p className="mt-4 text-gray-400">
            We build digital experiences that solve real problems and create
            measurable business value.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <div
                key={service.title}
                className="group rounded-xl border border-white/10 bg-white/200 p-6 text-center transition duration-300 hover:-translate-y-2 hover:border-cyan-400/40 hover:bg-cyan-400/3"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400 transition group-hover:bg-cyan-400 group-hover:text-slate-950">
                  <Icon size={25} />
                </div>

                <h3 className="mt-5 font-semibold">{service.title}</h3>

                <p className="mt-3 text-sm leading-6 text-gray-500">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
