import { motion } from "framer-motion";

const stats = [
  {
    value: "20+",
    label: "Years Experience",
  },
  {
    value: "9",
    label: "Professional Roles",
  },
  {
    value: "2",
    label: "Countries",
  },
  {
    value: "2+",
    label: "Years Software Development",
  },
];

export default function Stats() {
  return (
    <div className="stats-grid">
      {stats.map((stat) => (
        <motion.div
          key={stat.label}
          className="stat-box"
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
        >
          <h3>{stat.value}</h3>

          <p>{stat.label}</p>
        </motion.div>
      ))}
    </div>
  );
}
