import { motion } from "framer-motion";
import { FaBriefcase, FaBuilding, FaGlobeEurope, FaCode } from "react-icons/fa";

const stats = [
  {
    icon: FaBriefcase,
    color: "#3B82F6",
    value: "20+",
    label: "Years Experience",
  },
  {
    icon: FaBuilding,
    color: "#10B981",
    value: "12",
    label: "Professional Roles",
  },
  {
    icon: FaGlobeEurope,
    color: "#F59E0B",
    value: "2",
    label: "Countries",
  },
  {
    icon: FaCode,
    color: "#8B5CF6",
    value: "2+",
    label: "Years Software Development",
  },
];

export default function Stats() {
  return (
    <div className="stats-grid">
      {stats.map((stat, index) => {
        const Icon = stat.icon;

        return (
          <motion.div
            key={stat.label}
            className="stat-box"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
            }}
          >
            <Icon
              size={32}
              style={{
                color: stat.color,
                marginBottom: "12px",
              }}
              aria-hidden="true"
              role="presentation"
              focusable="false"
            />

            <h3>{stat.value}</h3>

            <p>{stat.label}</p>
          </motion.div>
        );
      })}
    </div>
  );
}
