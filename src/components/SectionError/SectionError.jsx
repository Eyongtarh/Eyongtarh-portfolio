// Compact fallback shown when one lazy section fails, instead of a full page error.
import PropTypes from "prop-types";
import { isChunkError } from "../../utils/errors";

export default function SectionError({ error, reset }) {
  // React caches a failed lazy import, so retrying in place can't fix a missing chunk.
  const chunk = isChunkError(error);

  return (
    <div className="section-error" role="alert">
      <p>
        {chunk
          ? "This section couldn't be downloaded. The site may have just been updated."
          : "This section could not be displayed."}
      </p>
      <button
        type="button"
        className="btn"
        onClick={chunk ? () => window.location.reload() : reset}
      >
        {chunk ? "Reload page" : "Try again"}
      </button>
    </div>
  );
}

SectionError.propTypes = {
  error: PropTypes.object,
  reset: PropTypes.func.isRequired,
};
