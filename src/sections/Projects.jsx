import ProjectCard from '../components/ProjectCard'
import { projects } from '../data/projects'

function Projects() {
  return (
    <section id="projects" className="projects-section p-8 pb-100 text-white">
      <h2 className="text-2xl font-bold mb-4 text-center">Projects</h2>
      <div className="project-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </section>
  )
}
export default Projects
