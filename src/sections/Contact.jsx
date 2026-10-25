function Contact() {
  return (
    <section id="contact " className="contact-section p-8 bg-gray-900 text-white">
      <h2 className="text-2xl font-bold mb-4 text-center">Contact</h2>
      <form className="contact-form max-w-md mx-auto flex flex-col gap-10">
        <div className="space-y-2">
          <label className="text-sm font-medium">Name</label>
          <input
          type="text"
          placeholder="John Doe"
          className="p-2 rounded bg-gray-800 text-white border border-gray-700"
        />
        </div>
      
        <input
          type="email"
          placeholder="john@example.com"
          className="p-2 rounded bg-gray-800 text-white border border-gray-700"
        />
        <textarea
          placeholder="Type your message here..."
          className="p-2 rounded bg-gray-800 text-white border border-gray-700"
        ></textarea>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Send Message
        </button>
      </form>
      <p>
        Reach me at <a href="mailto:you@example.com">you@example.com</a> or find me on{' '}
        <a href="https://github.com/yourusername" target="_blank" rel="noreferrer">
          GitHub
        </a>
        .
      </p>
    </section>
  )
}
export default Contact
