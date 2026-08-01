// Renders the contact section with contact information and a contact form.
import { motion } from "framer-motion";
import "./Contact.css";
import ContactInfo from "./ContactInfo";
import ContactForm from "./ContactForm";

export default function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="container">
        <motion.div
          className="section-heading"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <span className="section-subtitle">Get In Touch</span>
          <h2>Let's Work Together</h2>
          <p>
            Whether you're looking for a Full Stack Developer, need help
            building a web application, or simply want to connect, I'd love to
            hear from you.
          </p>
        </motion.div>
        <div className="contact-content">
          <ContactInfo />
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
