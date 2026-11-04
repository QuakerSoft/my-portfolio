const DOT_COLOR = 'rgba(255, 255, 255, 0.22)'
const DOT_SIZE = '1px' // radius of each dot
const SPACING = '22px' // distance between dots

function DotGrid() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 bg-black"
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(${DOT_COLOR} ${DOT_SIZE}, transparent ${DOT_SIZE})`,
          backgroundSize: `${SPACING} ${SPACING}`,
          // fully visible in the middle, fading out toward the edges
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
        }}
      />
    </div>
  )
}

export default DotGrid
