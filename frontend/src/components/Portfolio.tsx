import project1 from '../assets/images/project-1.webp'
import project2 from '../assets/images/project-2.webp'
import project3 from '../assets/images/project-3.webp'
import project4 from '../assets/images/project-4.webp'

const projects = [
  {
    title: "FindDash Platform",
    category: "Web Application",
    image: `${project1}`,
  },
  {
    title: "Shopix Mobile App",
    category: "Mobile App",
    image: `${project2}`,
  },
  {
    title: "Analytics Dashboard",
    category: "Web Application",
    image: `${project3}`,
  },
  {
    title: "Travelix Website",
    category: "Web Design",
    image: `${project4}`,
  },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">

        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
              Our Portfolio
            </p>

            <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
              Featured Projects
            </h2>
          </div>

          <a
            href="#contact"
            className="w-fit rounded-lg border border-cyan-400/40 px-5 py-2.5 text-sm font-medium transition hover:bg-cyan-400 hover:text-slate-950"
          >
            View All Projects
          </a>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {projects.map((project) => (
            <article
              key={project.title}
              className="group overflow-hidden rounded-xl border border-white/10 bg-white/2"
            >
              <div className="aspect-4/3 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              <div className="flex items-center justify-between p-4">
                <h3 className="text-sm font-semibold">{project.title}</h3>

                <span className="rounded-full border border-white/10 px-2 py-1 text-[10px] text-gray-500">
                  {project.category}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
