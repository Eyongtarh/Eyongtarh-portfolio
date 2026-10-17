// Sends contact form messages through EmailJS with validation, rate limiting and a timeout.
import emailjs, { EmailJSResponseStatus } from "@emailjs/browser";
import { config } from "../config/env";

const TIMEOUT_MS = 15_000;
const THROTTLE_MS = 30_000;

export const LIMITS = Object.freeze({ name: 100, email: 254, subject: 150, message: 5000 });

export class EmailError extends Error {
  constructor(code, message, cause) {
    super(message);
    this.name = "EmailError";
    this.code = code;
    this.cause = cause;
  }
}

let initialised = false;

function ensureReady() {
  const { serviceId, templateId, publicKey } = config.emailjs;
  if (!serviceId || !templateId || !publicKey) {
    throw new EmailError("config", "The email service is not configured.");
  }
  if (!initialised) {
    emailjs.init({
      publicKey,
      blockHeadless: true,
      limitRate: { id: "contact-form", throttle: THROTTLE_MS },
    });
    initialised = true;
  }
  return { serviceId, templateId };
}

function assertPayload(data) {
  Object.entries(LIMITS).forEach(([field, max]) => {
    const value = data?.[field];
    if (typeof value !== "string" || !value.trim() || value.length > max) {
      throw new EmailError("invalid", `The ${field} field is missing or too long.`);
    }
  });
}

function withTimeout(promise, ms) {
  let timer;
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(() => reject(new EmailError("timeout", "The request timed out.")), ms);
  });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
}

export async function sendEmail(formData) {
  assertPayload(formData);
  const { serviceId, templateId } = ensureReady();

  const email = formData.email.trim();
  const params = {
    name: formData.name.trim(),
    email,
    reply_to: email,
    title: formData.subject.trim(),
    message: formData.message.trim(),
    sent_at: new Date().toISOString(),
  };

  try {
    return await withTimeout(emailjs.send(serviceId, templateId, params), TIMEOUT_MS);
  } catch (error) {
    if (error instanceof EmailError) throw error;
    if (error instanceof EmailJSResponseStatus) {
      const code = error.status === 429 ? "rate_limited" : "service";
      throw new EmailError(code, `EmailJS responded with status ${error.status}.`, error);
    }
    throw new EmailError("network", "The message could not reach the email service.", error);
  }
}
