// Contact form validation, kept separate from the component so it can be tested
// directly and the component file only exports components.
import { LIMITS } from "../../utils/emailjs";

export const MIN_NAME = 2;
export const MIN_MESSAGE = 20;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
// Control characters except tab, line feed and carriage return.
// eslint-disable-next-line no-control-regex
const CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;

export function clean(values) {
  return Object.fromEntries(
    Object.entries(values).map(([key, value]) => [
      key,
      String(value).replace(CONTROL_CHARS, "").trim(),
    ])
  );
}

export function validate(values) {
  const errors = {};

  if (!values.name) errors.name = "Please enter your name.";
  else if (values.name.length < MIN_NAME)
    errors.name = `Your name must be at least ${MIN_NAME} characters.`;

  if (!values.email) errors.email = "Please enter your email address.";
  else if (!EMAIL_PATTERN.test(values.email)) errors.email = "Please enter a valid email address.";

  if (!values.subject) errors.subject = "Please enter a subject.";

  if (!values.message) errors.message = "Please enter your message.";
  else if (values.message.length < MIN_MESSAGE)
    errors.message = `Your message must be at least ${MIN_MESSAGE} characters.`;

  Object.entries(LIMITS).forEach(([key, max]) => {
    if (values[key]?.length > max) errors[key] = `Please keep this under ${max} characters.`;
  });

  return errors;
}
