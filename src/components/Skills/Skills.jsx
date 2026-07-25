import { motion } from "framer-motion";
import skills from "../../data/skills";
import "./Skills.css";

function SkillGroup({ title, data }) {
  return (
    <motion.div
      className="skill-group"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h3>{title}</h3>

      <div className="badge-container">
        {data.map((skill, index) => {
          const Icon = skill.icon;

          return (
            <motion.span
              key={skill.name}
              className="skill-badge"
              initial={{
                opacity: 0,
                scale: 0.8,
                y: 15,
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.04,
                duration: 0.35,
              }}
            >
              {Icon && (
                <Icon
                  size={20}
                  style={{
                    color: skill.color,
                  }}
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
                />
              )}

              <span>{skill.name}</span>
            </motion.span>
          );
        })}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="skills">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Skills & Technologies
        </motion.h2>

        <SkillGroup title="Frontend" data={skills.frontend} />

        <SkillGroup title="Backend" data={skills.backend} />

        <SkillGroup title="Tools" data={skills.tools} />
      </div>
    </section>
  );
}
