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
    </section>
  )
}

export default Hero
