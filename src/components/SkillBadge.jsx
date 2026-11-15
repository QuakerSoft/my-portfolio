function SkillBadge({ name, icon, invert = false }) {
  return (
    <div className="skill-badge inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/80 px-4 py-2 text-sm text-slate-200 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-500">
      <img
        src={icon}
        alt=""
        className={`h-5 w-5 object-contain ${invert ? 'brightness-0 invert' : ''}`}
      />
      {name}
    </div>
  )
}

export default SkillBadge
