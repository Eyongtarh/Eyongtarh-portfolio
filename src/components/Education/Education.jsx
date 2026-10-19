// Education section listing academic qualifications.
import { FaLaptopCode, FaGraduationCap, FaUniversity } from "react-icons/fa";
import Reveal from "../Reveal/Reveal";
import "./Education.css";

const education = [
  {
    icon: FaLaptopCode,
    color: "#60A5FA",
    title: "Diploma in Full Stack Software Development",
    institution:
      "Code Institute, accredited by the University of the West of Scotland",
    period: "June 2024 to March 2026",
    text: "Comprehensive training in modern full stack software development, including React, JavaScript, Python, Django, PostgreSQL, Git, Agile methodologies and cloud deployment.",
  },
  {
    icon: FaGraduationCap,
    color: "#FBBF24",
    title: "MSc Coursework in Economics",
    institution:
      "University of Gothenburg, School of Business, Economics and Law, Sweden",
    period: "2009 to 2011",
    text: "Advanced studies in economics with emphasis on quantitative analysis, economic policy and research methods.",
  },
  {
    icon: FaUniversity,
    color: "#34D399",
    title: "BSc in Economics",
    institution: "University of Buea, Cameroon",
    period: "2001 to 2004",
    text: "Built a strong foundation in economics, finance, statistics, management and business analysis.",
  },
];

export default function Education() {
  return (
    <section
      id="education"
      className="education"
      aria-labelledby="education-title"
    >
      <div className="container">
        <Reveal className="section-heading">
          <span className="section-subtitle">Qualifications</span>
          <h2 id="education-title">Education</h2>
        </Reveal>
        <ul className="education-grid reset-list">
          {education.map(
            (
              { icon: Icon, color, title, institution, period, credits, text },
              index,
            ) => (
              <Reveal as="li" key={title} delay={index * 0.15}>
                <article className="card education-card">
                  <div className="card-icon" aria-hidden="true">
                    <Icon size={32} style={{ color }} focusable="false" />
                  </div>
                  <h3>{title}</h3>
                  <p className="education-institution">{institution}</p>
                  <p className="education-meta">
                    {period}
                    {credits && <> · {credits}</>}
                  </p>
                  <p>{text}</p>
                </article>
              </Reveal>
            ),
          )}
        </ul>
      </div>
    </section>
  );
}
