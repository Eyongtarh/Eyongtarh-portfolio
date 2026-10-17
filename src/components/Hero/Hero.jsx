// Hero section. Entrance animations wait for `ready`, so they play after the
// loading screen fades instead of finishing unseen behind it.
//
// Performance: the heading, description and portrait are the Largest Contentful
// Paint candidates, so they are painted fully opaque from the first frame and only
// slide into place. Browsers ignore elements at opacity 0 for LCP, so fading these
// in would push LCP back by the length of the loader plus the animation.
// The background video mounts only after the page is ready, so it never competes
// with the script, styles and font for bandwidth, and it is skipped for visitors
// who have asked their browser to save data.
import PropTypes from "prop-types";
import { m, useReducedMotion } from "framer-motion";
import { FaArrowRight, FaCode, FaDownload } from "react-icons/fa";
import SocialLinks from "../SocialLinks/SocialLinks";
import { CV_URL, CV_FILENAME, SITE_NAME } from "../../data/site";
import backgroundVideo from "../../assets/videos/blue.mp4";

const SAVE_DATA = typeof navigator !== "undefined" && navigator.connection?.saveData === true;
import "./Hero.css";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

// For LCP candidates: movement only, never transparent.
const paintedItem = {
  hidden: { y: 30 },
  show: { y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Hero({ ready = true }) {
  const reduce = useReducedMotion();
  const visible = ready || reduce;
  const [firstName, lastName] = SITE_NAME.split(" ");

  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      {ready && !reduce && !SAVE_DATA && (
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          tabIndex={-1}
          disablePictureInPicture
        >
          <source src={backgroundVideo} type="video/mp4" />
        </video>
      )}
      <div className="hero-overlay" aria-hidden="true" />

      <m.div
        className="hero-content"
        variants={container}
        initial={reduce ? false : "hidden"}
        animate={visible ? "show" : "hidden"}
      >
        <m.a variants={item} href="#contact" className="hero-badge">
          <span className="badge-dot" aria-hidden="true" />
          Available for opportunities
          <FaArrowRight aria-hidden="true" focusable="false" />
        </m.a>

        <m.p variants={item} className="hero-greeting">
          Hello, I&apos;m
        </m.p>

        <m.h1 variants={paintedItem} id="hero-title">
          <span>{firstName}</span> <span>{lastName}</span>
        </m.h1>

        <m.p variants={paintedItem} className="hero-role">
          Full Stack Software Developer
        </m.p>

        <m.p variants={paintedItem} className="hero-description">
          I design and build scalable, user focused web applications using <strong>React</strong>,{" "}
          <strong>Django</strong>, <strong>Python</strong>, <strong>PostgreSQL</strong> and{" "}
          <strong>JavaScript</strong>, turning ideas into secure, high performance solutions
          through cloud deployment, API integration, database design and automation.
        </m.p>

        <m.div variants={item} className="hero-buttons">
          <a href="#projects" className="btn">
            <FaCode aria-hidden="true" focusable="false" />
            View projects
          </a>
          <a href={CV_URL} download={CV_FILENAME} className="btn secondary-btn">
            <FaDownload aria-hidden="true" focusable="false" />
            Download CV
          </a>
        </m.div>

        <m.div variants={item}>
          <SocialLinks className="hero-social" />
        </m.div>
      </m.div>

      <m.div
        className="hero-image-wrapper"
        initial={reduce ? false : { scale: 0.92 }}
        animate={visible ? { scale: 1 } : { scale: 0.92 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className={`hero-image${reduce ? "" : " is-floating"}`}>
          <img
            src="/profile.webp"
            alt={`Portrait of ${SITE_NAME}`}
            width="430"
            height="392"
            fetchPriority="high"
            decoding="async"
          />
        </div>
      </m.div>

      <a href="#about" className="scroll-indicator" aria-label="Scroll to the About section">
        <span aria-hidden="true" />
      </a>
    </section>
  );
}

Hero.propTypes = {
  ready: PropTypes.bool,
};
