
export default function ProjectCard({
  title,
  description,
  image,
  tags,
  liveUrl,
  githubUrl,
}) {
  return (
    <article className="group overflow-hidden rounded-xl border border-slate-700 bg-slate-950/80 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/10">

      {/* Project image */}
      {image && (
        <div className="overflow-hidden">
          <img
            src={image}
            alt={`${title} preview`}
            className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}

      {/* Project information */}
      <div className="p-5">
        <h3 className="mb-2 text-xl font-semibold text-white">
          {title}
        </h3>

        <p className="mb-4 text-sm leading-relaxed text-slate-400">
          {description}
        </p>

        {/* Technology tags */}
        {tags && (
          <ul className="mb-5 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-slate-700 bg-slate-800 px-3 py-1 text-xs text-cyan-300"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}

        {/* Separate action buttons */}
        <div className="grid grid-cols-2 gap-3 border-t border-slate-800 pt-4">

          {liveUrl ? (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-lg bg-cyan-500 px-3 py-2.5 text-sm font-medium text-slate-950 transition-colors hover:bg-cyan-400"
            >
              <span>View Live</span>
              <span aria-hidden="true">↗</span>
            </a>
          ) : (
            <span className="flex items-center justify-center rounded-lg border border-slate-800 px-3 py-2.5 text-sm text-slate-500">
              No Live Demo
            </span>
          )}

          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-lg border border-slate-700 px-3 py-2.5 text-sm font-medium text-slate-200 transition-colors hover:border-cyan-400 hover:text-cyan-300"
            >
              <span>View Code</span>
              <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
