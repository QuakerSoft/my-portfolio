import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'motion/react'

// how far the card leans toward the cursor, in degrees
const MAX_TILT = 8

export default function ProjectCard({
  title,
  description,
  image,
  tags,
  liveUrl,
  githubUrl,
  featured = false,
}) {
  const reduceMotion = useReducedMotion()

  // cursor position inside the card, from 0 to 1 on each axis
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)

  // springs make the tilt ease in and out instead of snapping
  const spring = { stiffness: 250, damping: 20 }
  // big cards tilt half as much so they do not swing too far
  const tilt = featured ? MAX_TILT / 2 : MAX_TILT
  const rotateX = useSpring(useTransform(py, [0, 1], [tilt, -tilt]), spring)
  const rotateY = useSpring(useTransform(px, [0, 1], [-tilt, tilt]), spring)

  // soft blue glow that follows the cursor
  const spotX = useTransform(px, (v) => `${v * 100}%`)
  const spotY = useTransform(py, (v) => `${v * 100}%`)
  const spotlight = useMotionTemplate`radial-gradient(350px circle at ${spotX} ${spotY}, rgba(59,130,246,0.15), transparent 70%)`

  function handleMove(e) {
    // skip on touch screens and for people who turned on "reduce motion"
    if (reduceMotion || e.pointerType !== 'mouse') return
    const rect = e.currentTarget.getBoundingClientRect()
    px.set((e.clientX - rect.left) / rect.width)
    py.set((e.clientY - rect.top) / rect.height)
  }

  function handleLeave() {
    px.set(0.5)
    py.set(0.5)
  }

  return (
    <motion.article
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className={`group relative flex h-full flex-col overflow-hidden rounded-xl border border-slate-700 bg-slate-950/80 transition-[border-color,box-shadow] duration-300 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10 ${featured ? 'lg:flex-row' : ''}`}
    >
      {/* Spotlight overlay */}
      <motion.div
        aria-hidden="true"
        style={{ background: spotlight }}
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      {/* Project image */}
      {image && (
        <div
          className={`relative shrink-0 overflow-hidden ${
            featured ? 'h-64 sm:h-72 lg:h-auto lg:min-h-80 lg:w-3/5' : 'h-48'
          }`}
        >
          {/* show only the top of the screenshot, so tall pages don't take over */}
          <img
            src={image}
            alt={`${title} preview`}
            className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
          {/* dark tint so bright screenshots blend into the dark site; lifts on hover */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-b from-slate-950/40 to-slate-950/75 transition-opacity duration-500 group-hover:opacity-0"
          />
        </div>
      )}

      {/* Project information */}
      <div className={`flex flex-1 flex-col p-5 ${featured ? 'lg:justify-center lg:p-8' : ''}`}>
        <h3 className={`mb-2 flex items-center gap-3 font-semibold text-white ${featured ? 'text-2xl' : 'text-xl'}`}>
          {title}
          {featured && (
            <span className="rounded-full border border-blue-500/40 px-2.5 py-0.5 font-mono text-xs font-normal text-blue-400">
              featured
            </span>
          )}
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
                className="rounded-full border border-slate-700 bg-slate-800 px-3 py-1 text-xs text-blue-400"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}

        {/* Separate action buttons */}
        <div className={`grid grid-cols-2 gap-3 border-t border-slate-800 pt-4 ${featured ? 'mt-auto lg:mt-0' : 'mt-auto'}`}>

          {liveUrl ? (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-3 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-500"
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
              className="flex items-center justify-center gap-2 rounded-lg border border-slate-700 px-3 py-2.5 text-sm font-medium text-slate-200 transition-colors hover:border-blue-500 hover:text-blue-400"
            >
              <span>View Code</span>
              <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
