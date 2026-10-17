// Contact form with client validation, spam protection and accessible feedback.
import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { FaPaperPlane, FaSpinner } from "react-icons/fa";
import Reveal from "../Reveal/Reveal";
import { clean, validate } from "./validation";
import { sendEmail, LIMITS } from "../../utils/emailjs";
import { CONTACT_EMAIL } from "../../data/site";
import { config } from "../../config/env";

const MIN_FILL_MS = 3000;

const FIELDS = [
  { id: "name", label: "Full name", autoComplete: "name", placeholder: "Jane Smith" },
  {
    id: "email",
    label: "Email address",
    type: "email",
    autoComplete: "email",
    inputMode: "email",
    placeholder: "jane@example.com",
  },
  { id: "subject", label: "Subject", autoComplete: "off", placeholder: "Project enquiry" },
  {
    id: "message",
    label: "Message",
    as: "textarea",
    rows: 6,
    placeholder: "Tell me about your project",
  },
];

const initialForm = { name: "", email: "", subject: "", message: "" };

const ERROR_MESSAGES = {
  rate_limited: "You've just sent a message. Please wait a moment before sending another.",
  timeout: "The request took too long. Please check your connection and try again.",
  config: `The form is temporarily unavailable. Please email me at ${CONTACT_EMAIL}.`,
};
const DEFAULT_ERROR = `Your message could not be sent. Please try again later or email me at ${CONTACT_EMAIL}.`;
const SUCCESS = "Thank you, your message has been sent. I'll reply as soon as I can.";

function Field({ id, label, as: Tag = "input", error, ...props }) {
  const errorId = `${id}-error`;
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <Tag
        id={id}
        name={id}
        required
        maxLength={LIMITS[id]}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? errorId : undefined}
        {...props}
      />
      {error && (
        <p id={errorId} className="error-text">
          {error}
        </p>
      )}
    </div>
  );
}

Field.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  as: PropTypes.elementType,
  error: PropTypes.string,
};

export default function ContactForm() {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [honeypot, setHoneypot] = useState("");
  const formRef = useRef(null);
  const mountedAt = useRef(0);

  // Record when the form appeared, for the bot timing check. Reading the clock
  // belongs in an effect, not during render.
  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (sending) return;

    // Bots fill hidden fields or submit instantly. Pretend success and stop.
    if (honeypot || Date.now() - mountedAt.current < MIN_FILL_MS) {
      setStatus({ type: "success", message: SUCCESS });
      return;
    }

    const values = clean(formData);
    const found = validate(values);
    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      setErrors(found);
      formRef.current?.querySelector(`#${firstInvalid}`)?.focus();
      return;
    }

    setSending(true);
    setStatus({ type: "", message: "" });
    try {
      await sendEmail(values);
      setFormData(initialForm);
      setErrors({});
      setStatus({ type: "success", message: SUCCESS });
    } catch (error) {
      if (config.isDev) console.error(error);
      setStatus({ type: "error", message: ERROR_MESSAGES[error?.code] ?? DEFAULT_ERROR });
    } finally {
      setSending(false);
    }
  }

  return (
    <Reveal className="card card--static contact-form-wrapper">
      <form
        ref={formRef}
        className="contact-form"
        onSubmit={handleSubmit}
        noValidate
        aria-label="Contact form"
      >
        {FIELDS.map(({ id, ...field }) => (
          <Field
            key={id}
            id={id}
            {...field}
            value={formData[id]}
            onChange={handleChange}
            error={errors[id]}
          />
        ))}

        <div className="hp-field" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input
            id="website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </div>

        <button className="submit-btn" type="submit" disabled={sending} aria-busy={sending}>
          {sending ? (
            <>
              <FaSpinner className="spin" aria-hidden="true" focusable="false" /> Sending
            </>
          ) : (
            <>
              <FaPaperPlane aria-hidden="true" focusable="false" /> Send message
            </>
          )}
        </button>

        <div role="status" aria-live="polite">
          {status.message && <p className={`form-status ${status.type}`}>{status.message}</p>}
        </div>
      </form>
    </Reveal>
  );
}
