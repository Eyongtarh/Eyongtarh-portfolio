// Renders and manages the contact form, including validation, submission, and user feedback.
import { useState } from "react";
import { motion } from "framer-motion";
import { sendEmail } from "../../utils/emailjs";

const initialForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function ContactForm() {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState({
    type: "",
    message: "",
  });
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  }
  function validate() {
    const validationErrors = {};
    if (!formData.name.trim()) {
      validationErrors.name = "Please enter your name.";
    }
    if (!formData.email.trim()) {
      validationErrors.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      validationErrors.email = "Please enter a valid email address.";
    }
    if (!formData.subject.trim()) {
      validationErrors.subject = "Please enter a subject.";
    }
    if (!formData.message.trim()) {
      validationErrors.message = "Please enter your message.";
    }
    return validationErrors;
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }
    try {
      setSending(true);
      setStatus({
        type: "",
        message: "",
      });
      await sendEmail(formData);
      setStatus({
        type: "success",
        message:
          "Your message has been sent successfully. I'll get back to you as soon as possible.",
      });
      setFormData(initialForm);
    } catch (error) {
      console.error(error);
      setStatus({
        type: "error",
        message:
          "Something went wrong while sending your message. Please try again later.",
      });
    } finally {
      setSending(false);
    }
  }
  return (
    <motion.div
      className="contact-form-wrapper"
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <form className="contact-form" onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <small className="error-text">{errors.name}</small>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <small className="error-text">{errors.email}</small>}
        </div>
        <div className="form-group">
          <label htmlFor="subject">Subject</label>
          <input
            id="subject"
            type="text"
            name="subject"
            placeholder="Project Inquiry"
            value={formData.subject}
            onChange={handleChange}
          />
          {errors.subject && (
            <small className="error-text">{errors.subject}</small>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            rows="6"
            placeholder="Tell me about your project..."
            value={formData.message}
            onChange={handleChange}
          />
          {errors.message && (
            <small className="error-text">{errors.message}</small>
          )}
        </div>
        <button className="submit-btn" type="submit" disabled={sending}>
          {sending ? (
            <>
              <i className="fa-solid fa-spinner fa-spin"></i> Sending...
            </>
          ) : (
            <>
              <i className="fa-solid fa-paper-plane"></i> Send Message
            </>
          )}
        </button>
        {status.message && (
          <div className={`form-status ${status.type}`}>{status.message}</div>
        )}
      </form>
    </motion.div>
  );
}
