import SkillBadge from '../components/SkillBadge'

const skills = ['React.JS', 'TypeScript', 'Java', 'Spring Boot', 'PostgreSQL', 'Node.js']

function Skills() {
  return (
    <section id="skills" className="skills-section p-8 bg-gray-900 text-white">
      <h2 className="text-2xl font-bold mb-4">Skills</h2>
      <div className="skills-list">
        {skills.map((skill) => (
          <SkillBadge key={skill} name={skill} />
        ))}
      </div>
    </section>
  )
}

export default Skills
