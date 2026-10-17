// Guards the content files so a typo can't ship an invisible icon, a broken
// date, an unsafe link or an out of order timeline.
import skills from "../skills";
import experience from "../experience";
import featuredProjects from "../featuredProjects";
import { contrastRatio, mix } from "../../utils/contrast";
import { isValidMonth } from "../../utils/dates";
import { buildStats } from "../stats";

const SURFACE = "#1e293b";
const BADGE_BACKGROUND = mix(SURFACE, "#ffffff", 0.05);
const MIN_GRAPHIC_CONTRAST = 3;

describe("skills", () => {
  const rows = Object.entries(skills).flatMap(([group, items]) =>
    items.map((item) => [group, item.name, item.color]),
  );

  test.each(rows)(
    "%s: %s icon is visible on its badge",
    (_group, _name, color) => {
      expect(contrastRatio(color, BADGE_BACKGROUND)).toBeGreaterThanOrEqual(
        MIN_GRAPHIC_CONTRAST,
      );
    },
  );

  test("names are unique within each group", () => {
    Object.values(skills).forEach((items) => {
      const names = items.map((i) => i.name);
      expect(new Set(names).size).toBe(names.length);
    });
  });
});

describe("experience", () => {
  test.each(experience.map((e) => [e.id, e]))(
    "%s has valid required fields",
    (_id, entry) => {
      expect(typeof entry.icon).toBe("function");
      expect(entry.role).toBeTruthy();
      expect(entry.company).toBeTruthy();
      expect(isValidMonth(entry.start)).toBe(true);
      if (entry.end !== null) {
        expect(isValidMonth(entry.end)).toBe(true);
        expect(entry.end >= entry.start).toBe(true);
      }
    },
  );

  test("ids are unique", () => {
    const ids = experience.map((e) => e.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  test("is sorted newest first", () => {
    const starts = experience.map((e) => e.start);
    expect(starts).toEqual([...starts].sort().reverse());
  });

  test("stats are derived from the data", () => {
    const stats = buildStats(experience, new Date(Date.UTC(2026, 9, 17)));
    const byLabel = Object.fromEntries(stats.map((s) => [s.label, s.value]));
    expect(byLabel["Professional roles"]).toBe(String(experience.length));
    expect(byLabel["Years of experience"]).toBe("22+");
    expect(byLabel.Countries).toBe("2");
    expect(byLabel["Years in software development"]).toBe("2+");
  });
});

describe("featured projects", () => {
  test.each(featuredProjects.map((p) => [p.title, p]))(
    "%s has safe links and an image",
    (_t, p) => {
      if (p.repoUrl) expect(p.repoUrl).toMatch(/^https:\/\/github\.com\//);
      if (p.demoUrl) expect(p.demoUrl).toMatch(/^https:\/\//);
      // Every card needs at least one link, or visitors have nowhere to go.
      expect(Boolean(p.repoUrl || p.demoUrl)).toBe(true);
      expect(p.image.fallback).toMatch(/^\//);
      expect(p.image.alt.length).toBeGreaterThan(5);
    },
  );

  test("ids are unique", () => {
    const ids = featuredProjects.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
