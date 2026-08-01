// Renders the professional experience section with summary statistics and a chronological timeline.
import "./Experience.css";
import Stats from "./Stats";
import TimelineItem from "./TimelineItem";
import experience from "../../data/experience";

export default function Experience() {
  return (
    <section id="experience" className="experience">
      <div className="container">
        <h2>Professional Experience</h2>
        <p className="section-text">
          A professional journey spanning software engineering, consulting,
          entrepreneurship, logistics, education and leadership.
        </p>
        <Stats />
        <div className="timeline">
          {experience.map((item, index) => (
            <TimelineItem key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
