import { motion } from "framer-motion";
import { FaLaptopCode, FaGraduationCap, FaUniversity } from "react-icons/fa";
import "./Education.css";

const education = [
  {
    icon: FaLaptopCode,
    color: "#3B82F6",
    title: "Diploma in Full Stack Software Development",
    subtitle: "Code Institute (University of the West of Scotland accredited)",
    period: "06/2024 - 03/2026",
    text: "Comprehensive training in modern full-stack software development, including React, JavaScript, Python, Django, PostgreSQL, Git, Agile methodologies and cloud deployment.",
  },
  {
    icon: FaGraduationCap,
    color: "#F59E0B",
    title: "MSc in Economics",
    subtitle: "University of Gothenburg, Sweden",
    period: "2009/2010 - 2011/2012, 67.5 credits",
    text: "Advanced studies in economics with emphasis on quantitative analysis, economic policy and research methods.",
  },
  {
    icon: FaUniversity,
    color: "#10B981",
    title: "BSc in Economics",
    subtitle: "University of Buea, Cameroon",
    period: "2001/2002 - 2003/2004",
    text: "Built a strong foundation in economics, finance, statistics, management and business analysis.",
  },
];

export default function Education() {
  return (
    <section id="education" className="education">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Education
        </motion.h2>

        <div className="education-grid">
          {education.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.article
                key={item.title}
                className="education-card"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Icon
                  size={36}
                  style={{
                    color: item.color,
                  }}
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
                />

                <h3>{item.title}</h3>

                <h4>{item.subtitle}</h4>

                {item.period && <span>{item.period}</span>}

                <p>{item.text}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
