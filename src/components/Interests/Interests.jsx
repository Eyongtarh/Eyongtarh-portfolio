// Interests section showcasing personal interests and activities.
import {
  FaLaptopCode,
  FaLightbulb,
  FaBookOpen,
  FaGlobeEurope,
  FaHiking,
  FaUsers,
} from "react-icons/fa";
import Reveal from "../Reveal/Reveal";
import "./Interests.css";

const interests = [
  {
    icon: FaLaptopCode,
    color: "#60A5FA",
    title: "Software Development",
    description:
      "Building modern web applications with React, Django, REST APIs and PostgreSQL while continuously learning new technologies.",
  },
  {
    icon: FaLightbulb,
    color: "#FBBF24",
    title: "Problem Solving",
    description:
      "I enjoy breaking down complex business and technical challenges into simple, efficient and scalable solutions.",
  },
  {
    icon: FaBookOpen,
    color: "#34D399",
    title: "Continuous Learning",
    description:
      "Technology evolves rapidly, and I enjoy exploring new frameworks, programming languages, cloud platforms and development tools.",
  },
  {
    icon: FaGlobeEurope,
    color: "#60A5FA",
    title: "Business and Innovation",
    description:
      "My background in business management helps me develop software that solves real business problems and creates value.",
  },
  {
    icon: FaHiking,
    color: "#F87171",
    title: "Hobbies and Activities",
    description:
      "I enjoy staying active and working on practical projects. I'm an avid lawn tennis player and have been a club member since 1998. I also enjoy car mechanics, furniture making and woodworking, swimming, hiking, gardening, home décor and DIY home improvement.",
  },
  {
    icon: FaUsers,
    color: "#A78BFA",
    title: "Mentoring",
    description:
      "I enjoy sharing knowledge, collaborating with teams and helping others learn programming and technology.",
  },
];

export default function Interests() {
  return (
    <section id="interests" className="interests" aria-labelledby="interests-title">
      <div className="container">
        <Reveal className="section-heading" y={30} duration={0.5}>
          <span className="section-subtitle">Beyond Development</span>
          <h2 id="interests-title">Interests</h2>
          <p>
            My curiosity extends beyond software engineering. These interests inspire creativity,
            continuous learning and a balanced approach to technology and life.
          </p>
        </Reveal>
        <ul className="interests-grid reset-list">
          {interests.map(({ icon: Icon, color, title, description }, index) => (
            <Reveal as="li" key={title} delay={index * 0.1} duration={0.5}>
              <article className="card interest-card">
                <div className="card-icon" aria-hidden="true">
                  <Icon size={32} style={{ color }} focusable="false" />
                </div>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
