// Detects errors caused by a lazy chunk failing to download, which usually
// means the site was redeployed while the visitor had it open.
const CHUNK_ERROR = /dynamically imported module|Importing a module script failed|ChunkLoadError|Unable to preload CSS/i;

export function isChunkError(error) {
  if (!error) return false;
  return CHUNK_ERROR.test(`${error.name ?? ""} ${error.message ?? ""}`);
}
