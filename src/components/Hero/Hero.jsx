import { LazyMotion, domAnimation, m } from "framer-motion";
import "./Hero.css";

const socialLinks = [
  {
    icon: "fab fa-github",
    url: "https://github.com/Eyongtarh",
    label: "GitHub",
  },
  {
    icon: "fab fa-linkedin-in",
    url: "https://www.linkedin.com/in/a-eyongtarh-besong-22ab9b281/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BB4C9QtntQn2cFJU2nmfRNQ%3D%3D",
    label: "LinkedIn",
  },
  {
    icon: "fas fa-envelope",
    url: "mailto:eyongtarhb@gmail.com",
    label: "Email",
  },
];

export default function Hero() {
  return (
    <LazyMotion features={domAnimation}>
      <section className="hero" id="home">
        <div className="hero-content">
          <m.a
            href="#contact"
            className="hero-badge"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{
              scale: 1.03,
              y: -2,
            }}
            whileTap={{
              scale: 0.98,
            }}
          >
            <span className="badge-dot"></span>
            Available for opportunities
            <i className="fas fa-arrow-right"></i>
          </m.a>

          <m.p
            className="hero-greeting"
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.1,
              duration: 0.6,
            }}
          >
            Hello, I'm
          </m.p>

          <m.h1
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.2,
              duration: 0.7,
            }}
          >
            <span>Eyongtarh</span>
            <span>Besong</span>
          </m.h1>

          <m.h2
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.35,
              duration: 0.7,
            }}
          >
            Full Stack Software Developer
          </m.h2>

          <m.p
            className="hero-description"
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.5,
              duration: 0.7,
            }}
          >
            I design and build scalable, user-focused web applications using
            <strong> React</strong>,<strong> Django</strong>,
            <strong>Python</strong>,<strong> PostgreSQL</strong>, and
            <strong> JavaScript</strong>, transforming ideas into secure,
            high-performance solutions through cloud deployment, API
            integration, database design, and automation.
          </m.p>

          <m.div
            className="hero-buttons"
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.7,
              duration: 0.7,
            }}
          >
            <a href="#projects" className="btn secondary-btn">
              <i className="fas fa-code"></i>
              View Projects
            </a>

            <a
              href="/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn secondary-btn"
            >
              <i className="fas fa-download"></i>
              Download CV
            </a>
          </m.div>

          <m.div
            className="hero-social"
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.9,
              duration: 0.7,
            }}
          >
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
              >
                <i className={social.icon}></i>
              </a>
            ))}
          </m.div>
        </div>
        <m.div
          className="hero-image-wrapper"
          initial={{
            opacity: 0,
            scale: 0.9,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            delay: 0.4,
            duration: 0.8,
          }}
        >
          <m.div
            className="hero-image"
            animate={{
              y: [0, -15, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <img
              src="/profile.jpeg"
              alt="Eyongtarh Besong"
              width="430"
              height="430"
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
          </m.div>
        </m.div>

        <m.a
          href="#about"
          className="scroll-indicator"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 1.4,
          }}
          aria-label="Scroll to About section"
        >
          <span></span>
        </m.a>
      </section>
    </LazyMotion>
  );
}
