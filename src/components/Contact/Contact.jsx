// Contact section with contact details and the contact form.
import Reveal from "../Reveal/Reveal";
import ContactInfo from "./ContactInfo";
import ContactForm from "./ContactForm";
import "./Contact.css";

export default function Contact() {
  return (
    <section id="contact" className="contact" aria-labelledby="contact-title">
      <div className="container">
        <Reveal className="section-heading" y={30} duration={0.5}>
          <span className="section-subtitle">Get In Touch</span>
          <h2 id="contact-title">Let&apos;s Work Together</h2>
          <p>
            Whether you&apos;re looking for a Full Stack Developer, need help building a web
            application, or simply want to connect, I&apos;d love to hear from you.
          </p>
        </Reveal>
        <div className="contact-content">
          <ContactInfo />
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
