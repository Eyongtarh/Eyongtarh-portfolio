import { formatMonth, formatPeriod, isValidMonth, yearsSince } from "../dates";

test("formats months in British English", () => {
  expect(formatMonth("2024-02")).toBe("February 2024");
  expect(formatMonth("2007")).toBe("2007");
  expect(formatMonth(null)).toBe("Present");
});

test("formats a period without dashes", () => {
  expect(formatPeriod("2022-12", "2024-03")).toBe("December 2022 to March 2024");
  expect(formatPeriod("2015-03", null)).toBe("March 2015 to Present");
});

test("validates month strings", () => {
  expect(isValidMonth("2024-12")).toBe(true);
  expect(isValidMonth("2024")).toBe(true);
  expect(isValidMonth("2024-13")).toBe(false);
  expect(isValidMonth("Feb 2024")).toBe(false);
});

test("counts whole years elapsed", () => {
  const now = new Date(Date.UTC(2026, 9, 17));
  expect(yearsSince("2024-02", now)).toBe(2);
  expect(yearsSince("2004", now)).toBe(22);
  expect(yearsSince("2026-11", now)).toBe(0);
});
