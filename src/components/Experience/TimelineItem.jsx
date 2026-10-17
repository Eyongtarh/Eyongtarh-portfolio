// A single entry in the experience timeline.
import PropTypes from "prop-types";
import { FaMapMarkerAlt } from "react-icons/fa";
import Reveal from "../Reveal/Reveal";
import { formatMonth } from "../../utils/dates";

export default function TimelineItem({ item }) {
  const { icon: Icon, role, company, location, start, end, summary, highlights = [], skills = [] } =
    item;

  return (
    <Reveal as="li" className="timeline-item" amount={0.15}>
      <div className="timeline-marker" aria-hidden="true">
        <Icon size={24} focusable="false" />
      </div>
      <article className="card timeline-card">
        <p className="timeline-period">
          <time dateTime={start}>{formatMonth(start)}</time>
          {" to "}
          {end ? <time dateTime={end}>{formatMonth(end)}</time> : "Present"}
        </p>
        <h3>{role}</h3>
        <p className="timeline-company">{company}</p>
        {location && (
          <p className="timeline-location">
            <FaMapMarkerAlt size={14} aria-hidden="true" focusable="false" />
            {location}
          </p>
        )}
        {summary && <p className="timeline-summary">{summary}</p>}
        {highlights.length > 0 && (
          <ul className="timeline-highlights">
            {highlights.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        )}
        {skills.length > 0 && (
          <ul className="timeline-skills reset-list" aria-label="Key skills">
            {skills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        )}
      </article>
    </Reveal>
  );
}

TimelineItem.propTypes = {
  item: PropTypes.shape({
    icon: PropTypes.elementType.isRequired,
    role: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    location: PropTypes.string,
    start: PropTypes.string.isRequired,
    end: PropTypes.string,
    summary: PropTypes.string,
    highlights: PropTypes.arrayOf(PropTypes.string),
    skills: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};
