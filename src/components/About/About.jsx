// About section with cards highlighting background, skills and experience.
import { FaCode, FaLightbulb, FaUsers } from "react-icons/fa";
import Reveal from "../Reveal/Reveal";
import "./About.css";

const cards = [
  {
    icon: FaCode,
    color: "#60A5FA",
    title: "Full Stack Development",
    text: "I build scalable, secure and high performance web applications using React, Django, REST APIs and PostgreSQL. My focus is on clean architecture, maintainable code, responsive design and excellent user experiences.",
  },
  {
    icon: FaLightbulb,
    color: "#FBBF24",
    title: "Problem Solver",
    text: "I enjoy transforming complex business challenges into intuitive digital solutions. By combining analytical thinking with modern technologies, I create applications that are both technically robust and easy to use.",
  },
  {
    icon: FaUsers,
    color: "#34D399",
    title: "Business Experience",
    text: "My background in consulting, entrepreneurship, logistics and business management helps me bridge technology and business strategy, delivering software that creates real value for organisations.",
  },
];

export default function About() {
  return (
    <section id="about" className="about" aria-labelledby="about-title">
      <div className="container">
        <Reveal className="section-heading about-heading">
          <span className="section-subtitle">Who I Am</span>
          <h2 id="about-title">About Me</h2>
          <p>
            I&apos;m a Full Stack Software Developer passionate about building modern, scalable and
            user friendly web applications. By combining software engineering expertise with years
            of consulting and business experience, I create solutions that are technically robust,
            performance driven and aligned with real business goals. I enjoy solving challenging
            problems, learning emerging technologies and developing applications that deliver
            meaningful value to users and organisations.
          </p>
        </Reveal>

        <ul className="about-grid reset-list">
          {cards.map(({ icon: Icon, color, title, text }, index) => (
            <Reveal as="li" key={title} delay={index * 0.15} y={50}>
              <article className="card about-card">
                <div className="card-icon" aria-hidden="true">
                  <Icon size={34} style={{ color }} focusable="false" />
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
