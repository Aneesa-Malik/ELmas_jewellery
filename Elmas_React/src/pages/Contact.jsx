import { useState } from "react";
import { useDocumentTitle } from "../hooks.js";
import "../styles/pg-contact.css";

export default function Contact() {
  useDocumentTitle("Contact Us | ELMAS Jewellery");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  function handleSubmit(e) {
    e.preventDefault();
    alert("Message dispatched safely!");
    setForm({ name: "", email: "", message: "" });
  }

  return (
    <div className="pg-contact">
      <div className="contact-wrapper">
        <div className="contact-luxury-box">
          <h2>Get In Touch</h2>
          <p className="text-muted small mb-4">Have questions about our premier designs? Our desk is active 24/7.</p>

          <div className="info-item-luxury">
            <i className="bi bi-telephone"></i>
            <span><strong>Phone:</strong> +92 300 1234567</span>
          </div>
          <div className="info-item-luxury">
            <i className="bi bi-whatsapp"></i>
            <span><strong>WhatsApp:</strong> +92 300 1234567</span>
          </div>
          <div className="info-item-luxury">
            <i className="bi bi-envelope"></i>
            <span><strong>Email:</strong> support@elmas.com</span>
          </div>

          <form onSubmit={handleSubmit}>
            <input type="text" className="form-control-custom" placeholder="Your Name" required value={form.name} onChange={update("name")} />
            <input type="email" className="form-control-custom" placeholder="Email Address" required value={form.email} onChange={update("email")} />
            <textarea className="form-control-custom" rows="3" placeholder="Write your luxury inquiry details..." required value={form.message} onChange={update("message")}></textarea>
            <button type="submit" className="btn-submit-luxury">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
}
