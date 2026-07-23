import { motion } from "framer-motion";
import "./About.css";

const cards = [
  {
    icon: "fas fa-code",
    title: "Full Stack Development",
    text: "I build scalable, secure, and high-performance web applications using React, Django, REST APIs, and PostgreSQL. My focus is on clean architecture, maintainable code, responsive design, and delivering exceptional user experiences.",
  },
  {
    icon: "fas fa-lightbulb",
    title: "Problem Solver",
    text: "I enjoy transforming complex business challenges into intuitive digital solutions. By combining analytical thinking with modern technologies, I create applications that are both technically robust and easy to use.",
  },
  {
    icon: "fas fa-users",
    title: "Business Experience",
    text: "My background in consulting, entrepreneurship, logistics, and business management enables me to bridge the gap between technology and business strategy, delivering software that creates real value for organizations.",
  },
];

export default function About() {
  return (
    <section id="about" className="about">
      <div className="container">
        <motion.div
          className="section-heading"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <span className="section-subtitle">Who I Am</span>

          <h2>About Me</h2>

          <p className="about-intro">
            I'm a Full Stack Software Developer passionate about building
            modern, scalable, and user-friendly web applications. By combining
            software engineering expertise with years of consulting and business
            experience, I create solutions that are technically robust,
            performance driven, and aligned with real business goals. I enjoy
            solving challenging problems, learning emerging technologies, and
            developing applications that deliver meaningful value to users and
            organisations.
          </p>
        </motion.div>

        <div className="about-grid">
          {cards.map((card, index) => (
            <motion.article
              key={card.title}
              className="about-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{
                y: -8,
                transition: { duration: 0.25 },
              }}
              transition={{
                delay: index * 0.15,
                duration: 0.6,
              }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <div className="about-icon">
                <i className={card.icon}></i>
              </div>

              <h3>{card.title}</h3>

              <p>{card.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
