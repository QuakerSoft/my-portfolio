import SkillBadge from '../components/SkillBadge'

const skills = [
  {
    name: 'React.JS',
    icon: '/public/icons/react-original.svg'
  },
  {
    name: 'Java',
    icon: '/public/icons/java-plain.svg'
  },
  {
    name: 'TypeScript',
    icon: '/public/icons/typescript-original.svg'
  },
  {
    name: 'Spring Boot',
    icon: '/public/icons/spring-original.svg'
  },
  {
    name: 'PostgreSQL',
    icon: '/public/icons/postgresql-plain.svg'
  },
  {
    name: 'Express.js',
    icon: '/public/icons/express-original.svg'
  }
]

function Skills() {
  return (
    <section id="skills" className="skills-section p-8 bg-gray-900 text-white">
      <h2 className="text-2xl font-bold mb-4 text-center">Skills</h2>
      <div className="skills-list grid grid-cols-3 gap-4">
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
