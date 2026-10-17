// Summary statistics cards. The numbers are computed in src/data/stats.js.
import Reveal from "../Reveal/Reveal";
import stats from "../../data/stats";

export default function Stats() {
  return (
    <ul className="stats-grid reset-list">
      {stats.map(({ icon: Icon, color, value, label }, index) => (
        <Reveal as="li" key={label} delay={index * 0.1} duration={0.5}>
          <div className="card stat-box">
            <Icon
              size={32}
              className="stat-icon"
              style={{ color }}
              aria-hidden="true"
              focusable="false"
            />
            <p className="stat-value">{value}</p>
            <p className="stat-label">{label}</p>
          </div>
        </Reveal>
      ))}
    </ul>
  );
}
