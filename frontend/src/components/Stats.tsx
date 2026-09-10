import {
  BriefcaseBusiness,
  Users,
  Clock,
  Award,
} from "lucide-react";

const stats = [
  {
    value: "50+",
    label: "Projects Completed",
    icon: BriefcaseBusiness,
  },
  {
    value: "30+",
    label: "Happy Clients",
    icon: Users,
  },
  {
    value: "5+",
    label: "Years of Experience",
    icon: Clock,
  },
  {
    value: "10+",
    label: "Expert Team Members",
    icon: Award,
  },
];

export default function Stats() {
  return (
    <section className="px-5 lg:px-8">
      <div className="mx-auto grid max-w-7xl grid-cols-2 rounded-2xl border border-white/10 bg-white/200 p-4 md:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="flex items-center gap-4 border-white/5 p-5 md:border-r last:border-r-0"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400">
                <Icon size={22} />
              </div>

              <div>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
