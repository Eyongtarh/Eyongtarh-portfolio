import { motion } from "framer-motion";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function TimelineItem({ item, index }) {
  const Icon = item.icon;

  return (
    <motion.article
      className="timeline-item"
      initial={{
        opacity: 0,
        x: index % 2 === 0 ? -80 : 80,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
      }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="timeline-marker">
        <Icon
          size={26}
          style={{
            color: item.color,
          }}
          aria-hidden="true"
          role="presentation"
          focusable="false"
        />
      </div>

      <div className="timeline-card">
        <span className="timeline-period">{item.period}</span>

        <h3>{item.role}</h3>

        <h4>{item.company}</h4>

        <p className="timeline-location">
          <FaMapMarkerAlt
            size={14}
            style={{
              color: "#EF4444",
              marginRight: "8px",
              verticalAlign: "middle",
            }}
            aria-hidden="true"
          />
          {item.location}
        </p>

        <p className="timeline-summary">{item.summary}</p>

        <ul>
          {item.highlights.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>

        <div className="timeline-skills">
          {item.technologies.map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
