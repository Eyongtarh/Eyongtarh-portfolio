import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaBootstrap,
  FaNodeJs,
  FaPython,
  FaDocker,
  FaGitAlt,
  FaGithub,
  FaFigma,
  FaAws,
} from "react-icons/fa";

import {
  SiTypescript,
  SiJquery,
  SiJest,
  SiDjango,
  SiFlask,
  SiPostgresql,
  SiVercel,
  SiRender,
  SiVite,
  SiFramer,
  SiStripe,
} from "react-icons/si";

const skills = {
  frontend: [
    { name: "HTML5", icon: FaHtml5, color: "#E34F26" },
    { name: "CSS3", icon: FaCss3Alt, color: "#1572B6" },
    { name: "JavaScript", icon: FaJs, color: "#F7DF1E" },
    { name: "React", icon: FaReact, color: "#61DAFB" },
    { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
    { name: "Bootstrap", icon: FaBootstrap, color: "#7952B3" },
    { name: "jQuery", icon: SiJquery, color: "#0769AD" },
  ],

  backend: [
    { name: "Python", icon: FaPython, color: "#3776AB" },
    { name: "Django", icon: SiDjango, color: "#092E20" },
    { name: "Flask", icon: SiFlask, color: "#FFFFFF" },
    { name: "Node.js", icon: FaNodeJs, color: "#339933" },
    { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
    { name: "Jest", icon: SiJest, color: "#C21325" },
    { name: "Stripe", icon: SiStripe, color: "#635BFF" },
  ],

  tools: [
    { name: "Git", icon: FaGitAlt, color: "#F05032" },
    { name: "GitHub", icon: FaGithub, color: "#FFFFFF" },
    { name: "Docker", icon: FaDocker, color: "#2496ED" },
    { name: "Figma", icon: FaFigma, color: "#F24E1E" },
    { name: "Vercel", icon: SiVercel, color: "#FFFFFF" },
    { name: "Render", icon: SiRender, color: "#46E3B7" },
    { name: "Vite", icon: SiVite, color: "#646CFF" },
    { name: "AWS S3", icon: FaAws, color: "#FF9900" },
    { name: "Framer Motion", icon: SiFramer, color: "#0055FF" },
  ],
};

export default skills;
