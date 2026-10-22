function ProjectCard({ title, description, image, tags, liveUrl, githubUrl }) {
  return (
    <div className="project-card border rounded-lg p-4 shadow-md transition-transform duration-500 ease-out hover:scale-105">
      {image && <img src={image} alt={title} />}
      <h3>{title}</h3>
      <p>{description}</p>
      {tags && (
        <ul className="tags">
          {tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      )}
      <div className="project-links">
        {liveUrl && <a href={liveUrl} target="_blank" rel="noreferrer">Live</a>}
        {githubUrl && <a href={githubUrl} target="_blank" rel="noreferrer">Code</a>}
      </div>
    </div>
  )
}
export default ProjectCard
