import SkillBadge from '../components/SkillBadge'

const skillGroups = [
  {
    category: 'Backend',
    skills: [
      { name: 'Java', icon: '/icons/java-plain.svg' },
      { name: 'Spring Boot', icon: '/icons/spring-original.svg' },
      { name: 'Express', icon: '/icons/express-original.svg', invert: true },
    ],
  },
  {
    category: 'Database',
    skills: [
      { name: 'PostgreSQL', icon: '/icons/postgresql-plain.svg' },
    ],
  },
  {
    category: 'Frontend',
    skills: [
      { name: 'React', icon: '/icons/react-original.svg' },
      { name: 'TypeScript', icon: '/icons/typescript-original.svg' },
    ],
  },
]

function Skills() {
  return (
    <section id="skills" className="skills-section p-8 pb-24 text-white">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8 md:mb-12 text-center">Skills</h2>
      <div className="skills-list mx-auto max-w-3xl divide-y divide-white/10">
        {skillGroups.map((group) => (
          <div key={group.category} className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:gap-6">
            <h3 className="w-24 shrink-0 font-mono text-sm text-blue-500">{group.category}</h3>
            <ul className="flex flex-wrap gap-3">
              {group.skills.map((skill) => (
                <li key={skill.name}>
                  <SkillBadge name={skill.name} icon={skill.icon} invert={skill.invert} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
export default Skills
