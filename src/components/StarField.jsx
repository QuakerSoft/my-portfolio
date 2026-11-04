import { useEffect, useRef } from 'react'

const STAR_DENSITY = 1 / 5000 // stars per square pixel
const MOUSE_RADIUS = 150 // how far the cursor pushes stars away
const LINK_RADIUS = 170 // how far the cursor draws lines to stars
const ACCENT = '59, 130, 246' // Tailwind blue-500

function StarField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let width = 0
    let height = 0
    let stars = []
    let sparks = []
    let ripples = []
    let frame = 0
    const mouse = { x: 0, y: 0, active: false }
    const parallax = { x: 0, y: 0 }

    // depth: 0 = far away (small, slow, dim), 1 = close (big, fast, bright)
    function createStar() {
      const depth = Math.random()
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        ox: 0, // displacement from the cursor / ripples
        oy: 0,
        vx: 0,
        vy: 0,
        depth,
        radius: 0.4 + depth * 1.4,
        speed: 0.03 + depth * 0.2,
        twinkle: Math.random() * Math.PI * 2,
      }
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      // keep existing stars so mobile address-bar resizes don't flicker
      const count = Math.round(width * height * STAR_DENSITY)
      while (stars.length < count) stars.push(createStar())
      stars.length = count
    }

    function update() {
      // ease the parallax toward the cursor's offset from the center
      const targetX = mouse.active ? (mouse.x - width / 2) / width : 0
      const targetY = mouse.active ? (mouse.y - height / 2) / height : 0
      parallax.x += (targetX - parallax.x) * 0.05
      parallax.y += (targetY - parallax.y) * 0.05

      for (const ripple of ripples) {
        ripple.radius += 6
        ripple.life -= 0.02
      }
      ripples = ripples.filter((ripple) => ripple.life > 0)

      for (const star of stars) {
        star.y -= star.speed
        star.twinkle += 0.02
        if (star.y < -10) {
          star.y = height + 10
          star.x = Math.random() * width
        }

        const sx = star.x + star.ox
        const sy = star.y + star.oy

        // push stars away from the cursor
        if (mouse.active) {
          const dx = sx - mouse.x
          const dy = sy - mouse.y
          const dist = Math.hypot(dx, dy)
          if (dist < MOUSE_RADIUS && dist > 0) {
            const force = (1 - dist / MOUSE_RADIUS) * 0.6 * (0.5 + star.depth)
            star.vx += (dx / dist) * force
            star.vy += (dy / dist) * force
          }
        }

        // shockwave rings from clicks push stars outward as they pass
        for (const ripple of ripples) {
          const dx = sx - ripple.x
          const dy = sy - ripple.y
          const dist = Math.hypot(dx, dy)
          if (dist > 0 && Math.abs(dist - ripple.radius) < 30) {
            const force = ripple.life * 2.5
            star.vx += (dx / dist) * force
            star.vy += (dy / dist) * force
          }
        }

        // spring back to the resting position
        star.vx += -star.ox * 0.01
        star.vy += -star.oy * 0.01
        star.vx *= 0.9
        star.vy *= 0.9
        star.ox += star.vx
        star.oy += star.vy
      }

      for (const spark of sparks) {
        spark.x += spark.vx
        spark.y += spark.vy
        spark.vx *= 0.96
        spark.vy *= 0.96
        spark.life -= 0.02
      }
      sparks = sparks.filter((spark) => spark.life > 0)
    }

    function draw() {
      ctx.clearRect(0, 0, width, height)

      for (const star of stars) {
        const x = star.x + star.ox - parallax.x * 40 * star.depth
        const y = star.y + star.oy - parallax.y * 40 * star.depth
        const alpha = (0.3 + star.depth * 0.7) * (0.6 + 0.4 * Math.sin(star.twinkle))

        // lines from the cursor to nearby stars
        if (mouse.active) {
          const dist = Math.hypot(x - mouse.x, y - mouse.y)
          if (dist < LINK_RADIUS) {
            ctx.strokeStyle = `rgba(${ACCENT}, ${(1 - dist / LINK_RADIUS) * 0.35})`
            ctx.lineWidth = 0.6
            ctx.beginPath()
            ctx.moveTo(mouse.x, mouse.y)
            ctx.lineTo(x, y)
            ctx.stroke()
          }
        }

        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`
        ctx.beginPath()
        ctx.arc(x, y, star.radius, 0, Math.PI * 2)
        ctx.fill()
      }

      for (const ripple of ripples) {
        ctx.strokeStyle = `rgba(${ACCENT}, ${ripple.life * 0.5})`
        ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2)
        ctx.stroke()
      }

      for (const spark of sparks) {
        ctx.fillStyle = `rgba(${spark.color}, ${spark.life})`
        ctx.beginPath()
        ctx.arc(spark.x, spark.y, spark.radius * spark.life, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    function loop() {
      update()
      draw()
      frame = requestAnimationFrame(loop)
    }

    function handlePointerMove(event) {
      mouse.x = event.clientX
      mouse.y = event.clientY
      mouse.active = true
    }

    function handlePointerLeave() {
      mouse.active = false
    }

    // touch has no hover, so stop repelling once the finger lifts
    function handlePointerUp(event) {
      if (event.pointerType !== 'mouse') mouse.active = false
    }

    function handlePointerDown(event) {
      ripples.push({ x: event.clientX, y: event.clientY, radius: 0, life: 1 })
      for (let i = 0; i < 28; i++) {
        const angle = Math.random() * Math.PI * 2
        const speed = 1 + Math.random() * 4
        sparks.push({
          x: event.clientX,
          y: event.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: 1 + Math.random() * 2,
          life: 1,
          color: Math.random() < 0.5 ? ACCENT : '255, 255, 255',
        })
      }
    }

    resize()

    if (reduceMotion) {
      draw()
      const handleStaticResize = () => {
        resize()
        draw()
      }
      window.addEventListener('resize', handleStaticResize)
      return () => window.removeEventListener('resize', handleStaticResize)
    }

    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerdown', handlePointerDown)
    window.addEventListener('pointerup', handlePointerUp)
    document.documentElement.addEventListener('pointerleave', handlePointerLeave)
    loop()

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('pointerup', handlePointerUp)
      document.documentElement.removeEventListener('pointerleave', handlePointerLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full bg-black"
    />
  )
}

export default StarField
