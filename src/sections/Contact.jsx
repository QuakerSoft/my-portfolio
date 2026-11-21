import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react'

const EMAIL = 'comodevin6@gmail.com' // TODO: your real email

// TODO: replace these placeholders with links
const contactLinks = [
  { label: 'email', text: EMAIL, href: `mailto:${EMAIL}`, copy: EMAIL },
  { label: 'github', text: 'github.com/QuakerSoft', href: 'https://github.com/QuakerSoft' },
  { label: 'linkedin', text: 'linkedin.com/in/yourname', href: 'https://www.linkedin.com/in/yourname' },
  { label: 'resume', text: 'resume.pdf', href: '/resume.pdf' },
]

const COMMAND = 'devin --contact'
const TYPE_SPEED = 60 // milliseconds per letter

// output lines slide in one after another once the command finishes typing
const outputList = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
}
const outputLine = {
  hidden: { opacity: 0, x: -8 },
  show: { opacity: 1, x: 0, transition: { duration: 0.35 } },
}

function Contact() {
  const terminalRef = useRef(null)
  const inView = useInView(terminalRef, { once: true, amount: 0.5 })
  const reduceMotion = useReducedMotion()
  const [typed, setTyped] = useState(0)
  const [copied, setCopied] = useState(false)
  const copyTimer = useRef(null)

  // copy the email to the clipboard and show "copied" for 2 seconds
  async function handleCopy(text) {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      return // clipboard blocked; the mailto link still works
    }
    setCopied(true)
    clearTimeout(copyTimer.current)
    copyTimer.current = setTimeout(() => setCopied(false), 2000)
  }

  useEffect(() => () => clearTimeout(copyTimer.current), [])

  // type the command one letter at a time once the terminal scrolls into view
  useEffect(() => {
    if (!inView || reduceMotion) return
    const timer = setInterval(() => {
      setTyped((n) => {
        if (n >= COMMAND.length) {
          clearInterval(timer)
          return n
        }
        return n + 1
      })
    }, TYPE_SPEED)
    return () => clearInterval(timer)
  }, [inView, reduceMotion])

  // people with "reduce motion" turned on see everything right away
  const shown = reduceMotion ? COMMAND.length : typed
  const doneTyping = shown >= COMMAND.length

  return (
    <section id="contact" className="contact-section p-8 pb-24 text-white">
      <div className="mx-auto max-w-6xl">
      {/* Section heading */}
      <p className="mb-2 font-mono text-sm text-blue-500 md:text-base">03 / contact</p>
      <h2 className="mb-4 text-2xl font-bold md:text-3xl lg:text-4xl">Get in touch</h2>
      <p className="mb-8 text-slate-400 md:mb-12 md:text-lg">
        Open to internships and junior developer roles.
      </p>

      <div
        ref={terminalRef}
        className="max-w-xl xl:max-w-2xl overflow-hidden rounded-xl border border-white/10 bg-slate-950/80 shadow-[0_0_24px_rgba(59,130,246,0.12)]"
      >
        {/* Window bar */}
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-slate-700" />
          <span className="h-3 w-3 rounded-full bg-slate-700" />
          <span className="h-3 w-3 rounded-full bg-slate-700" />
          <span className="ml-2 font-mono text-xs text-slate-500">contact.sh</span>
        </div>

        {/* Terminal body */}
        <div className="min-h-64 p-5 font-mono text-sm leading-8 sm:text-base xl:text-lg xl:leading-9">
          <p aria-label={COMMAND}>
            <span className="text-blue-500">$</span>{' '}
            <span aria-hidden="true">{COMMAND.slice(0, shown)}</span>
            {!doneTyping && (
              <motion.span
                aria-hidden="true"
                className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 bg-blue-500"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse', ease: 'linear' }}
              />
            )}
          </p>

          {doneTyping && (
            <motion.ul variants={outputList} initial="hidden" animate="show">
              {contactLinks.map((link) => (
                <motion.li key={link.label} variants={outputLine} className="flex items-center gap-4">
                  <span className="w-20 shrink-0 text-slate-500 sm:w-24">{link.label}</span>
                  <a
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="truncate text-slate-200 underline decoration-transparent underline-offset-4 transition-colors duration-300 hover:text-blue-400 hover:decoration-blue-500"
                  >
                    {link.text}
                  </a>

                  {/* copy button, only on lines that have something to copy */}
                  {link.copy && (
                    <span className="flex shrink-0 items-center gap-2">
                      <motion.button
                        type="button"
                        onClick={() => handleCopy(link.copy)}
                        aria-label={copied ? 'Email copied' : 'Copy email'}
                        title="Copy email"
                        whileTap={{ scale: 0.85 }}
                        className={`rounded-md p-1 transition-colors duration-300 ${
                          copied ? 'text-green-500' : 'text-slate-500 hover:text-blue-400'
                        }`}
                      >
                        <svg
                          viewBox="0 0 24 24"
                          className="h-4 w-4 sm:h-5 sm:w-5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          {copied ? (
                            <path d="M5 12l5 5L20 7" />
                          ) : (
                            <>
                              <rect x="9" y="9" width="12" height="12" rx="2" />
                              <path d="M5 15V5a2 2 0 0 1 2-2h10" />
                            </>
                          )}
                        </svg>
                      </motion.button>
                      <AnimatePresence>
                        {copied && (
                          <motion.span
                            role="status"
                            initial={{ opacity: 0, x: -6 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="text-xs text-green-500 sm:text-sm"
                          >
                            copied
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </span>
                  )}
                </motion.li>
              ))}
              <motion.li variants={outputLine} className="mt-2 text-slate-400">
                <span className="text-green-500">✓</span> usually replies within a day
              </motion.li>
            </motion.ul>
          )}
        </div>
      </div>
      </div>
    </section>
  )
}
export default Contact
