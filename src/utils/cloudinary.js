// Builds optimised Cloudinary image URLs with automatic format and quality.
// Returns null when Cloudinary isn't configured, so callers can fall back.
import { config } from "../config/env";

const SAFE_ID = /^[\w/.-]+$/;
const WIDTHS = [400, 800, 1200];

export function cldUrl(publicId, { width, height } = {}) {
  const cloud = config.cloudinaryCloud;
  if (!cloud || typeof publicId !== "string" || !SAFE_ID.test(publicId)) return null;

  const size = [width && `w_${width}`, height && `h_${height}`].filter(Boolean).join(",");
  const transforms = ["f_auto", "q_auto", "c_fill", "g_auto", size].filter(Boolean).join(",");
  return `https://res.cloudinary.com/${cloud}/image/upload/${transforms}/${publicId}`;
}

export function cldSrcSet(publicId, ratio) {
  if (!cldUrl(publicId)) return undefined;
  return WIDTHS.map(
    (w) => `${cldUrl(publicId, { width: w, height: Math.round(w / ratio) })} ${w}w`
  ).join(", ");
}
