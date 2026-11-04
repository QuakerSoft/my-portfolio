import SkillBadge from '../components/SkillBadge'

const skills = [
  {
    name: 'React.JS',
    icon: '/icons/react-original.svg'
  },
  {
    name: 'Java',
    icon: '/icons/java-plain.svg'
  },
  {
    name: 'TypeScript',
    icon: '/icons/typescript-original.svg'
  },
  {
    name: 'Spring Boot',
    icon: '/icons/spring-original.svg'
  },
  {
    name: 'PostgreSQL',
    icon: '/icons/postgresql-plain.svg'
  },
  {
    name: 'Express.js',
    icon: '/icons/express-original.svg'
  }
]

function Skills() {
  return (
    <section id="skills" className="skills-section p-8 text-white ">
      <h2 className="text-2xl font-bold mb-4 text-center">Skills</h2>
      <div className="skills-list grid grid-cols-3 gap-6 max-w-2xl mx-auto">
        {skills.map((skill) => (
          <SkillBadge 
          key={skill.icon} 
          name={skill.name} 
          icon={skill.icon}
          />
        ))}
      </div>
    </section>
  )
}
export default Skills
