// Professional experience section with summary statistics and a timeline.
import Reveal from "../Reveal/Reveal";
import Stats from "./Stats";
import TimelineItem from "./TimelineItem";
import experience from "../../data/experience";
import "./Experience.css";

export default function Experience() {
  return (
    <section id="experience" className="experience" aria-labelledby="experience-title">
      <div className="container">
        <Reveal className="section-heading">
          <span className="section-subtitle">Career</span>
          <h2 id="experience-title">Professional Experience</h2>
          <p>
            A professional journey spanning software engineering, consulting, entrepreneurship,
            logistics, education and leadership.
          </p>
        </Reveal>
        <Stats />
        <ol className="timeline reset-list" aria-label="Work history, most recent first">
          {experience.map((item) => (
            <TimelineItem key={item.id} item={item} />
          ))}
        </ol>
      </div>
    </section>
  );
}
