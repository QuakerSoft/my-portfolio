import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'

const PREFIX = "Hi..I'm Devin "
const HIGHLIGHT = 'Como' // shown in blue
const FULL = PREFIX + HIGHLIGHT

const TYPO = "Hi..I'm Devn" // typed first, then fixed
const TYPE_SPEED = 70 // milliseconds per letter
const START_DELAY = 400
const TYPO_PAUSE = 350 // pause before noticing the typo

// every step of the typing, in order, with how long to wait before it
function buildFrames() {
  const frames = []
  for (let i = 1; i <= TYPO.length; i++) {
    frames.push({ text: TYPO.slice(0, i), wait: TYPE_SPEED })
  }
  // backspace the "n"
  frames.push({ text: TYPO.slice(0, -1), wait: TYPO_PAUSE })
  // type the rest correctly
  const fixedStart = TYPO.length - 1
  for (let i = fixedStart + 1; i <= FULL.length; i++) {
    frames.push({ text: FULL.slice(0, i), wait: TYPE_SPEED })
  }
  return frames
}
const FRAMES = buildFrames()

// TODO: replace the placeholder LinkedIn and email (same ones as in Contact.jsx)
const socials = [
  {
    label: 'GitHub',
    href: 'https://github.com/QuakerSoft',
    svgProps: { fill: 'currentColor' },
    icon: <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/yourname',
    svgProps: { fill: 'currentColor' },
    icon: <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />,
  },
  {
    label: 'Email',
    href: 'mailto:comodevin6@gmail.com',
    svgProps: { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' },
    icon: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
  },
]

// subtitle and buttons rise in once the name is done
const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.15 } }),
}

function Hero() {
  const reduceMotion = useReducedMotion()
  const [frame, setFrame] = useState(0)

  // play the typing frames one after another
  useEffect(() => {
    if (reduceMotion) return
    const timers = []
    let time = START_DELAY
    FRAMES.forEach((f, i) => {
      time += f.wait
      timers.push(setTimeout(() => setFrame(i + 1), time))
    })
    return () => timers.forEach(clearTimeout)
  }, [reduceMotion])

  // people with "reduce motion" turned on see the full name right away
  const text = reduceMotion ? FULL : frame === 0 ? '' : FRAMES[frame - 1].text
  const done = text === FULL

  return (
    <section className="flex flex-col items-center justify-center min-h-screen p-8 text-white">
      <h1
        aria-label={FULL}
        className="text-4xl md:text-6xl xl:text-7xl font-bold mb-4 md:mb-6 text-center min-h-[1.2em]"
      >
        <span aria-hidden="true">
          {text.slice(0, PREFIX.length)}
          <span className="text-blue-500">{text.slice(PREFIX.length)}</span>
          {/* blinking cursor that fades away after the name is typed */}
          <motion.span
            className="ml-1 inline-block w-[3px] h-[0.85em] translate-y-[0.1em] bg-blue-500"
            animate={done ? { opacity: 0 } : { opacity: [1, 0] }}
            transition={
              done
                ? { duration: 0.4, delay: 1.5 }
                : { duration: 0.5, repeat: Infinity, repeatType: 'reverse', ease: 'linear' }
            }
          />
        </span>
      </h1>

      <motion.p
        className="text-xl md:text-2xl mb-6 md:mb-10"
        variants={fadeUp}
        custom={0}
        initial={reduceMotion ? false : 'hidden'}
        animate={done ? 'show' : 'hidden'}
      >
        Computer Science Student
      </motion.p>

      <div className="flex flex-wrap justify-center gap-4">
        {/* main action: solid blue pill with the same glow as the navbar */}
        <motion.a
          href="#contact"
          className="group inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 font-medium text-white shadow-[0_0_24px_rgba(59,130,246,0.35)] transition-[background-color,box-shadow] duration-300 hover:bg-blue-500 hover:shadow-[0_0_36px_rgba(59,130,246,0.6)] md:px-7 md:text-lg"
          variants={fadeUp}
          custom={1}
          initial={reduceMotion ? false : 'hidden'}
          animate={done ? 'show' : 'hidden'}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.96 }}
        >
          Contact Me
          <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </motion.a>

        {/* second action: quiet outlined pill */}
        <motion.a
          href="#projects"
          className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/60 px-6 py-3 font-medium text-slate-200 transition-colors duration-300 hover:border-blue-500 hover:text-white md:px-7 md:text-lg"
          variants={fadeUp}
          custom={2}
          initial={reduceMotion ? false : 'hidden'}
          animate={done ? 'show' : 'hidden'}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.96 }}
        >
          View Projects
          <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-y-0.5">↓</span>
        </motion.a>
      </div>

      {/* social icons */}
      <motion.ul
        className="mt-8 flex items-center gap-6"
        variants={fadeUp}
        custom={3}
        initial={reduceMotion ? false : 'hidden'}
        animate={done ? 'show' : 'hidden'}
      >
        {socials.map((s) => (
          <li key={s.label}>
            <motion.a
              href={s.href}
              aria-label={s.label}
              target={s.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="block text-slate-500 transition-colors duration-300 hover:text-blue-500"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6 md:h-7 md:w-7" aria-hidden="true" {...s.svgProps}>
                {s.icon}
              </svg>
            </motion.a>
          </li>
        ))}
      </motion.ul>
    </section>
  )
}

export default Hero
