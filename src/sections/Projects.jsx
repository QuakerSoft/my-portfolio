import { motion } from 'motion/react'
import ProjectCard from '../components/ProjectCard'
import { projects } from '../data/projects'

const GITHUB_PROFILE = 'https://github.com/QuakerSoft'

function Projects() {
  // the featured project goes first and gets the big spot
  const featured = projects.find((p) => p.featured)
  const others = projects.filter((p) => p !== featured)

  return (
    <section id="projects" className="projects-section p-8 pb-75 text-white">
      <div className="mx-auto max-w-6xl">
        {/* Section heading */}
        <p className="mb-2 font-mono text-sm text-blue-500 md:text-base">01 / projects</p>
        <h2 className="mb-8 text-2xl font-bold md:mb-12 md:text-3xl lg:text-4xl">Things I've built</h2>

        {/* featured card spans the full width; the rest sit two per row underneath */}
        <div className="project-grid grid grid-cols-1 gap-4 sm:grid-cols-2">
          {featured && (
            <div className="sm:col-span-2">
              <ProjectCard {...featured} />
            </div>
          )}
          {others.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}

          {/* Link to everything else */}
          <motion.a
            href={GITHUB_PROFILE}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="group flex items-center justify-between rounded-xl border border-dashed border-white/15 bg-slate-950/80 px-5 py-4 transition-colors duration-300 hover:border-blue-500 sm:col-span-2"
          >
            <span>
              <span className="block font-medium text-slate-200 group-hover:text-white">More on GitHub</span>
              <span className="text-sm text-slate-500">Smaller projects, experiments and class work</span>
            </span>
            <span
              aria-hidden="true"
              className="text-xl text-blue-500 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            >
              ↗
            </span>
          </motion.a>
        </div>
      </div>
    </section>
  )
}
export default Projects
