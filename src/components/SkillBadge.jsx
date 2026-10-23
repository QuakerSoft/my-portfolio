function SkillBadge({ name, icon }) {
  return (
    <div className="skill-badge flex flex-col items-center justify-center gap-4 bg-black text-white px-4 py-6 rounded-3xl text-center font-bold">
      <span className="text-3xl">
        {name}
      </span>

      <img
        src={icon}
        alt={`${name} logo`}
        className={`w-12 h-12 object-contain ${
      name === "Express.js" ? "brightness-0 invert" : ""
    }`}
      />
    </div>
  )
}

export default SkillBadge
