import { motion } from "framer-motion";
import "./Interests.css";

const interests = [
  {
    icon: "fa-solid fa-laptop-code",
    title: "Software Development",
    description:
      "Building modern web applications with React, Django, REST APIs, and PostgreSQL while continuously learning new technologies.",
  },
  {
    icon: "fa-solid fa-lightbulb",
    title: "Problem Solving",
    description:
      "I enjoy breaking down complex business and technical challenges into simple, efficient, and scalable solutions.",
  },
  {
    icon: "fa-solid fa-book-open",
    title: "Continuous Learning",
    description:
      "Technology evolves rapidly, and I enjoy exploring new frameworks, programming languages, cloud platforms, and development tools.",
  },
  {
    icon: "fa-solid fa-earth-europe",
    title: "Business & Innovation",
    description:
      "My background in business management helps me develop software that solves real-world business problems and creates value.",
  },
  {
    icon: "fa-solid fa-person-hiking",
    title: "Outdoor Activities",
    description:
      "I enjoy staying active and working on hands-on projects. I'm an avid lawn tennis player and have been a club member since 1998. I also enjoy automotive mechanics, furniture making and woodworking, swimming, hiking, gardening, home décor, and DIY home improvement projects.",
  },
  {
    icon: "fa-solid fa-users",
    title: "Mentoring",
    description:
      "I enjoy sharing knowledge, collaborating with teams, and helping others learn programming and technology.",
  },
];

export default function Interests() {
  return (
    <section id="interests" className="interests">
      <div className="container">
        <motion.div
          className="section-heading"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <span className="section-subtitle">Beyond Development</span>

          <h2>Interests</h2>

          <p>
            My curiosity extends beyond software engineering. These interests
            inspire creativity, continuous learning, and a balanced approach to
            technology and life.
          </p>
        </motion.div>

        <div className="interests-grid">
          {interests.map((interest, index) => (
            <motion.article
              key={interest.title}
              className="interest-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              viewport={{ once: true }}
            >
              <div className="interest-icon">
                <i className={interest.icon}></i>
              </div>

              <h3>{interest.title}</h3>

              <p>{interest.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
