// URL helpers shared by components that render links or background images.
const SAFE_PROTOCOLS = new Set(["http:", "https:", "mailto:"]);

// Allows site relative paths and http, https or mailto links. Blocks javascript:,
// data: and protocol relative URLs such as //evil.example.
export function isSafeHref(href) {
  if (typeof href !== "string" || !href.trim()) return false;
  if (href.startsWith("/") && !href.startsWith("//")) return true;
  try {
    return SAFE_PROTOCOLS.has(new URL(href).protocol);
  } catch {
    return false;
  }
}

// Returns an absolute https URL, or null for anything else.
export function safeUrl(url) {
  if (typeof url !== "string") return null;
  try {
    return new URL(url).protocol === "https:" ? url : null;
  } catch {
    return null;
  }
}

// Wraps a path in a quoted, encoded CSS url() so it can't break out of the declaration.
export function toCssUrl(src) {
  if (typeof src !== "string" || !src) return undefined;
  return `url("${encodeURI(src).replace(/"/g, "%22")}")`;
}
