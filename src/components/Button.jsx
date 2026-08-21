function Button({ children, onClick, href, type = 'button' }) {
  if (href) {
    return (
      <a className="btn" href={href} target="_blank" rel="noreferrer">
        {children}
      </a>
    )
  }

  return (
    <button className="btn" type={type} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
