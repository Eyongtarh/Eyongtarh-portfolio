import { motion } from "framer-motion";
import {
  FaLaptopCode,
  FaLightbulb,
  FaBookOpen,
  FaGlobeEurope,
  FaHiking,
  FaUsers,
} from "react-icons/fa";
import "./Interests.css";

const interests = [
  {
    icon: FaLaptopCode,
    color: "#3B82F6",
    title: "Software Development",
    description:
      "Building modern web applications with React, Django, REST APIs, and PostgreSQL while continuously learning new technologies.",
  },
  {
    icon: FaLightbulb,
    color: "#F59E0B",
    title: "Problem Solving",
    description:
      "I enjoy breaking down complex business and technical challenges into simple, efficient, and scalable solutions.",
  },
  {
    icon: FaBookOpen,
    color: "#10B981",
    title: "Continuous Learning",
    description:
      "Technology evolves rapidly, and I enjoy exploring new frameworks, programming languages, cloud platforms, and development tools.",
  },
  {
    icon: FaGlobeEurope,
    color: "#2563EB",
    title: "Business & Innovation",
    description:
      "My background in business management helps me develop software that solves real-world business problems and creates value.",
  },
  {
    icon: FaHiking,
    color: "#EF4444",
    title: "Outdoor Activities",
    description:
      "I enjoy staying active and working on hands-on projects. I'm an avid lawn tennis player and have been a club member since 1998. I also enjoy automotive mechanics, furniture making and woodworking, swimming, hiking, gardening, home décor, and DIY home improvement projects.",
  },
  {
    icon: FaUsers,
    color: "#8B5CF6",
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
          {interests.map((interest, index) => {
            const Icon = interest.icon;

            return (
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
                  <Icon
                    size={36}
                    style={{ color: interest.color }}
                    aria-hidden="true"
                    role="presentation"
                    focusable="false"
                  />
                </div>

                <h3>{interest.title}</h3>

                <p>{interest.description}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
