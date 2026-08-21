import SkillBadge from '../components/SkillBadge'

const skills = ['React', 'JavaScript', 'HTML', 'CSS', 'Git', 'Node.js']

function Skills() {
  return (
    <section id="skills">
      <h2>Skills</h2>
      <div className="skills-list">
        {skills.map((skill) => (
          <SkillBadge key={skill} name={skill} />
        ))}
      </div>
    </section>
  )
}

export default Skills
