// Formats "YYYY" or "YYYY-MM" strings for display in British English.
const MONTH_YEAR = new Intl.DateTimeFormat("en-GB", {
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

const PATTERN = /^\d{4}(-(0[1-9]|1[0-2]))?$/;

export function isValidMonth(value) {
  return typeof value === "string" && PATTERN.test(value);
}

export function formatMonth(value) {
  if (!value) return "Present";
  if (!isValidMonth(value)) return value;
  const [year, month] = value.split("-").map(Number);
  return month ? MONTH_YEAR.format(new Date(Date.UTC(year, month - 1))) : String(year);
}

export function formatPeriod(start, end) {
  return `${formatMonth(start)} to ${formatMonth(end)}`;
}

// Whole years elapsed since a "YYYY" or "YYYY-MM" value, measured to `now`.
export function yearsSince(value, now = new Date()) {
  const [year, month = 1] = value.split("-").map(Number);
  const months = (now.getUTCFullYear() - year) * 12 + (now.getUTCMonth() + 1 - month);
  return Math.max(0, Math.floor(months / 12));
}
