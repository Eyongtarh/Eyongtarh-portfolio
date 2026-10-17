// Summary statistics, derived from the experience data so they never drift.
import { FaBriefcase, FaBuilding, FaGlobeEurope, FaCode } from "react-icons/fa";
import experience from "./experience";
import { yearsSince } from "../utils/dates";

export function buildStats(entries = experience, now = new Date()) {
  const earliest = entries.reduce((min, e) => (e.start < min ? e.start : min), entries[0].start);
  const devRole = entries.find((e) => e.id === "fullstack");
  const countries = new Set(entries.map((e) => e.location.split(",").pop().trim()));

  return [
    {
      icon: FaBriefcase,
      color: "#60A5FA",
      value: `${yearsSince(earliest.slice(0, 4), now)}+`,
      label: "Years of experience",
    },
    {
      icon: FaBuilding,
      color: "#34D399",
      value: String(entries.length),
      label: "Professional roles",
    },
    { icon: FaGlobeEurope, color: "#FBBF24", value: String(countries.size), label: "Countries" },
    {
      icon: FaCode,
      color: "#A78BFA",
      value: devRole ? `${yearsSince(devRole.start, now)}+` : "0",
      label: "Years in software development",
    },
  ];
}

export default buildStats();
