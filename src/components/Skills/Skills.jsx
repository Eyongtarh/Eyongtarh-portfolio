import { memo } from "react";
import { motion } from "framer-motion";
import skills from "../../data/skills";
import "./Skills.css";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.04,
    },
  },
};

const badgeVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: 15,
  },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
  },
};

const SkillGroup = memo(function SkillGroup({ title, data }) {
  return (
    <motion.div
      className="skill-group"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h3>{title}</h3>

      <motion.div
        className="badge-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {data.map((skill) => {
          const Icon = skill.icon;

          return (
            <motion.span
              key={skill.name}
              className="skill-badge"
              variants={badgeVariants}
              transition={{ duration: 0.35 }}
            >
              {Icon && (
                <Icon
                  size={20}
                  style={{ color: skill.color }}
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
                />
              )}

              <span>{skill.name}</span>
            </motion.span>
          );
        })}
      </motion.div>
    </motion.div>
  );
});

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

        {Object.entries(skills).map(([title, data]) => (
          <SkillGroup key={title} title={title} data={data} />
        ))}
      </div>
    </section>
  );
}
