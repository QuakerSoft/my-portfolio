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
      <motion.a
        href="#contact"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 md:py-3 md:px-6 md:text-lg rounded"
        variants={fadeUp}
        custom={1}
        initial={reduceMotion ? false : 'hidden'}
        animate={done ? 'show' : 'hidden'}
      >
        Contact Me
      </motion.a>
      <motion.a
        href="#projects"
        className="bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 md:py-3 md:px-6 md:text-lg rounded"
        variants={fadeUp}
        custom={2}
        initial={reduceMotion ? false : 'hidden'}
        animate={done ? 'show' : 'hidden'}
      >
        View Projects
      </motion.a>
      </div>
    </section>
  )
}

export default Hero
