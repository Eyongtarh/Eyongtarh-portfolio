// Skills section with grouped technology badges.
import PropTypes from "prop-types";
import { m, useReducedMotion } from "framer-motion";
import Reveal from "../Reveal/Reveal";
import skills from "../../data/skills";
import "./Skills.css";

const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
};

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.85, y: 15 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.35 } },
};

function SkillGroup({ title, items }) {
  const reduce = useReducedMotion();
  const headingId = `skills-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

  return (
    <Reveal as="li" className="skill-group-item">
      <div className="card card--static skill-group" role="group" aria-labelledby={headingId}>
        <h3 id={headingId}>{title}</h3>
        <m.ul
          className="badge-container reset-list"
          variants={listVariants}
          initial={reduce ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {items.map(({ name, icon: Icon, color }) => (
            <m.li key={name} className="skill-badge" variants={badgeVariants}>
              {Icon && <Icon size={20} style={{ color }} aria-hidden="true" focusable="false" />}
              <span>{name}</span>
            </m.li>
          ))}
        </m.ul>
      </div>
    </Reveal>
  );
}

SkillGroup.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      icon: PropTypes.elementType,
      color: PropTypes.string,
    })
  ).isRequired,
};

export default function Skills() {
  return (
    <section id="skills" className="skills" aria-labelledby="skills-title">
      <div className="container">
        <Reveal className="section-heading">
          <span className="section-subtitle">What I Work With</span>
          <h2 id="skills-title">Skills and Technologies</h2>
        </Reveal>
        <ul className="skill-groups reset-list">
          {Object.entries(skills).map(([title, items]) => (
            <SkillGroup key={title} title={title} items={items} />
          ))}
        </ul>
      </div>
    </section>
  );
}
