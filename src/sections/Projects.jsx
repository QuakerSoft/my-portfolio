import ProjectCard from '../components/ProjectCard'
import { projects } from '../data/projects'

function Projects() {
  return (
    <section className="projects-section p-8 bg-gray-900 text-white fleax ">
      <h2 className="text-2xl font-bold mb-4">Projects</h2>
      <div className="project-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </section>
  )
}
export default Projects
