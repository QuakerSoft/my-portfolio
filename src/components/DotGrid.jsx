import { useEffect, useRef } from 'react'

const DOT_ALPHA = 0.22 // brightness of resting dots
const DOT_SIZE = 1 // radius of each dot, in pixels
const SPACING = 22 // distance between dots

// hover glow around the cursor
const GLOW_RADIUS = 110
const GLOW_STRENGTH = 0.55

// click ripple
const RIPPLE_SPEED = 420 // pixels per second
const RIPPLE_WIDTH = 28 // thickness of the wave
const RIPPLE_LIFE = 1.8 // seconds before it fades out
const RIPPLE_PUSH = 7 // how far dots get nudged as the wave passes

const ACCENT = [59, 130, 246] // blue-500

// clicks on these never start a ripple
const INTERACTIVE = 'a, button, input, textarea, select, label, article, [role="button"]'

function DotGrid() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let width = 0
    let height = 0
    let ripples = []
    let frameId = null

    // cursor target, smoothed position, and how visible the glow is (0 to 1)
    const mouse = { x: -9999, y: -9999, sx: -9999, sy: -9999, on: 0, target: 0 }

    function resize() {
      const dpr = window.devicePixelRatio || 1
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      draw(performance.now())
    }

    function draw(now) {
      ctx.clearRect(0, 0, width, height)
      ripples = ripples.filter((r) => (now - r.start) / 1000 < RIPPLE_LIFE)

      for (let x = SPACING / 2; x < width; x += SPACING) {
        for (let y = SPACING / 2; y < height; y += SPACING) {
          let px = x
          let py = y

          // glow from the cursor
          const hd = Math.hypot(x - mouse.sx, y - mouse.sy)
          let glow = Math.max(0, 1 - hd / GLOW_RADIUS) ** 2 * mouse.on * GLOW_STRENGTH

          // glow and nudge from each ripple's wavefront
          for (const r of ripples) {
            const age = (now - r.start) / 1000
            const dx = x - r.x
            const dy = y - r.y
            const dist = Math.hypot(dx, dy) || 1
            const band = Math.exp(-((dist - age * RIPPLE_SPEED) ** 2) / (2 * RIPPLE_WIDTH ** 2))
            const k = band * (1 - age / RIPPLE_LIFE)
            glow = Math.max(glow, k)
            px += (dx / dist) * k * RIPPLE_PUSH
            py += (dy / dist) * k * RIPPLE_PUSH
          }

          if (glow > 0.03) {
            // blend from white toward blue as the glow gets stronger
            const [r, g, b] = ACCENT.map((c) => Math.round(255 - (255 - c) * glow))
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${Math.min(1, DOT_ALPHA + glow * 0.85)})`
          } else {
            ctx.fillStyle = `rgba(255, 255, 255, ${DOT_ALPHA})`
          }
          ctx.beginPath()
          ctx.arc(px, py, DOT_SIZE + glow * 1.3, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }

    // only animate while something is happening, so an idle page costs nothing
    function tick(now) {
      mouse.sx += (mouse.x - mouse.sx) * 0.18
      mouse.sy += (mouse.y - mouse.sy) * 0.18
      mouse.on += (mouse.target - mouse.on) * 0.08
      draw(now)

      const glowSettled = Math.abs(mouse.target - mouse.on) < 0.01 && (mouse.target === 0 ||
        (Math.abs(mouse.x - mouse.sx) < 0.5 && Math.abs(mouse.y - mouse.sy) < 0.5))
      frameId = ripples.length || !glowSettled ? requestAnimationFrame(tick) : null
    }

    function wake() {
      if (!frameId) frameId = requestAnimationFrame(tick)
    }

    function handleMove(e) {
      if (e.pointerType !== 'mouse') return // no hover on touch screens
      if (mouse.sx < -9000) {
        mouse.sx = e.clientX
        mouse.sy = e.clientY
      }
      mouse.x = e.clientX
      mouse.y = e.clientY
      mouse.target = 1
      wake()
    }

    function handleLeave() {
      mouse.target = 0
      wake()
    }

    function handleClick(e) {
      if (e.target.closest(INTERACTIVE)) return
      ripples.push({ x: e.clientX, y: e.clientY, start: performance.now() })
      wake()
    }

    resize()
    window.addEventListener('resize', resize)

    // people with "reduce motion" turned on get the plain static grid
    if (!reduceMotion) {
      window.addEventListener('pointermove', handleMove)
      window.addEventListener('pointerdown', handleClick)
      document.documentElement.addEventListener('pointerleave', handleLeave)
    }

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', handleMove)
      window.removeEventListener('pointerdown', handleClick)
      document.documentElement.removeEventListener('pointerleave', handleLeave)
    }
  }, [])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 bg-black">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        style={{
          // fully visible in the middle, fading out toward the edges
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
        }}
      />
    </div>
  )
}

export default DotGrid
