// Project card with an optional pointer tilt. Framer animates the outer list item;
// the tilt is applied to the inner card through CSS variables, so the two never collide
// and moving the pointer never re-renders React.
import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import Reveal from "../Reveal/Reveal";
import useMediaQuery from "../../hooks/useMediaQuery";
import { cldUrl, cldSrcSet } from "../../utils/cloudinary";

const TILT_QUERY =
  "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";
const RATIO = 16 / 9;
const STRENGTH = 18;

export default function ProjectCard({ project }) {
  const {
    title,
    description,
    highlight,
    technologies,
    image,
    demoUrl,
    repoUrl,
  } = project;
  const cardRef = useRef(null);
  const rectRef = useRef(null);
  const frameRef = useRef(0);
  const canTilt = useMediaQuery(TILT_QUERY);

  useEffect(() => () => cancelAnimationFrame(frameRef.current), []);

  const handleEnter = () => {
    rectRef.current = cardRef.current?.getBoundingClientRect() ?? null;
  };

  const handleMove = (e) => {
    const rect = rectRef.current;
    if (!canTilt || !rect || e.pointerType !== "mouse") return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      const el = cardRef.current;
      if (!el) return;
      el.style.setProperty(
        "--rx",
        `${(-(y - rect.height / 2) / STRENGTH).toFixed(2)}deg`,
      );
      el.style.setProperty(
        "--ry",
        `${((x - rect.width / 2) / STRENGTH).toFixed(2)}deg`,
      );
      el.style.setProperty("--mouse-x", `${x}px`);
      el.style.setProperty("--mouse-y", `${y}px`);
    });
  };

  const handleLeave = () => {
    cancelAnimationFrame(frameRef.current);
    rectRef.current = null;
    cardRef.current?.style.removeProperty("--rx");
    cardRef.current?.style.removeProperty("--ry");
  };

  const cloudSrc = cldUrl(image.publicId, { width: 800, height: 450 });

  return (
    <Reveal as="li" className="project-item" amount={0.15}>
      <article
        ref={cardRef}
        className="card card--tilt project-card"
        onPointerEnter={handleEnter}
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
      >
        <div className="project-glow" aria-hidden="true" />
        <div className="project-image-frame">
          <img
            className="project-image"
            src={cloudSrc ?? image.fallback}
            srcSet={cloudSrc ? cldSrcSet(image.publicId, RATIO) : undefined}
            sizes={cloudSrc ? "(max-width: 900px) 100vw, 50vw" : undefined}
            alt={image.alt}
            width="800"
            height="450"
            loading="lazy"
            decoding="async"
            onError={(e) => {
              const img = e.currentTarget;
              if (img.dataset.fallback) return;
              img.dataset.fallback = "true";
              img.removeAttribute("srcset");
              img.src = image.fallback;
            }}
          />
        </div>
        <div className="project-body">
          {highlight && <p className="project-highlight">{highlight}</p>}
          <h3>{title}</h3>
          {description && <p className="project-description">{description}</p>}
          {technologies.length > 0 && (
            <ul className="project-tech reset-list" aria-label="Technologies">
              {technologies.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
          )}
          <div className="project-links">
            {demoUrl && (
              <a
                href={demoUrl}
                className="btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaExternalLinkAlt aria-hidden="true" focusable="false" />
                Live demo
                <span className="visually-hidden">
                  {" "}
                  of {title} (opens in a new tab)
                </span>
              </a>
            )}
            {repoUrl && (
              <a
                href={repoUrl}
                className="secondary-btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub aria-hidden="true" focusable="false" />
                Source code
                <span className="visually-hidden">
                  {" "}
                  for {title} on GitHub (opens in a new tab)
                </span>
              </a>
            )}
          </div>
        </div>
      </article>
    </Reveal>
  );
}

ProjectCard.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    highlight: PropTypes.string,
    technologies: PropTypes.arrayOf(PropTypes.string).isRequired,
    image: PropTypes.shape({
      publicId: PropTypes.string,
      fallback: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
    }).isRequired,
    demoUrl: PropTypes.string,
    repoUrl: PropTypes.string,
  }).isRequired,
};
