// WCAG 2 relative luminance and contrast ratio helpers for hex colours.
const HEX = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;

function toRgb(hex) {
  if (!HEX.test(hex)) throw new Error(`Invalid hex colour: ${hex}`);
  const value = hex.slice(1);
  const full = value.length === 3 ? [...value].map((c) => c + c).join("") : value;
  return [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16));
}

function toHex(rgb) {
  return `#${rgb.map((c) => Math.round(c).toString(16).padStart(2, "0")).join("")}`;
}

function luminance(hex) {
  const [r, g, b] = toRgb(hex).map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrastRatio(a, b) {
  const [high, low] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (high + 0.05) / (low + 0.05);
}

// Blends `top` over `base` at the given opacity, like an rgba() layer.
export function mix(base, top, alpha) {
  const b = toRgb(base);
  const t = toRgb(top);
  return toHex(b.map((c, i) => c + (t[i] - c) * alpha));
}
