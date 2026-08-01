// Renders an interactive project card with animations, hover effects, project details, and external links.
import { useRef } from "react";
import { motion } from "framer-motion";

export default function ProjectCard({ project }) {
  const cardRef = useRef(null);
  function handleMouseMove(e) {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = -(y - rect.height / 2) / 18;
    const rotateY = (x - rect.width / 2) / 18;
    card.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateY(-10px)
    `;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  }
  function handleMouseLeave() {
    if (!cardRef.current) return;
    cardRef.current.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";
  }
  return (
    <motion.article
      ref={cardRef}
      className="project-card"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="project-glow" />
      <img src={project.image} alt={project.name} className="project-image" />
      <div className="project-body">
        <span className="project-highlight">{project.highlight}</span>
        <h3>{project.name}</h3>
        <p>{project.description}</p>
        <div className="project-tech">
          {project.technologies?.map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>
        <div className="project-info">
          <span>⭐⭐ {project.stargazers_count}</span>
          <span>🍴 {project.forks_count}</span>
          <span>{project.language}</span>
        </div>
        <div className="project-links">
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer">
              Live Demo
            </a>
          )}
          <a href={project.html_url} target="_blank" rel="noopener noreferrer">
            View on GitHub
          </a>
        </div>
      </div>
    </motion.article>
  );
}
