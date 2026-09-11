import { useState } from "react";
import { api } from "../api";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState("");

  function update(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function submit(e) {
    e.preventDefault();
    setStatus("Sending...");
    try {
      const result = await api.contact(form);
      setStatus(result.message);
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      setStatus(err.message);
    }
  }

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">LET'S TALK</p>
          <h1>Plan something <em>beautiful.</em></h1>
          <p>Ask us about any product in our collection.</p>
        </div>
      </section>

      <section className="section">
        <div className="container contact-grid">
          <div className="contact-info">
            <p className="eyebrow">CONTACT DETAILS</p>
            <h2>We'd love to hear from you.</h2>
            <p>For product information, customization questions or wedding inspiration, send us a message.</p>
            <div className="contact-item"><strong>Location</strong><span>Hyderabad, Telangana</span></div>
            <div className="contact-item"><strong>Phone</strong><span>+91 90000 00000</span></div>
            <div className="contact-item"><strong>Email</strong><span>hello@example.com</span></div>
          </div>

          <form className="contact-form" onSubmit={submit}>
            {[
              ["name", "Name", "Your name", "text"],
              ["email", "Email", "Your email", "email"],
              ["phone", "Phone", "Phone number", "tel"],
            ].map(([name, label, placeholder, type]) => (
              <div className="field" key={name}>
                <label>{label}</label>
                <input className="form-control" name={name} type={type} placeholder={placeholder} value={form[name]} onChange={update} required={name !== "phone"} />
              </div>
            ))}
            <div className="field">
              <label>Message</label>
              <textarea className="form-control" name="message" rows="6" placeholder="Tell us what you are looking for..." value={form.message} onChange={update} required />
            </div>
            <button className="btn btn-primary" type="submit">Send Message →</button>
            {status && <p className="form-status">{status}</p>}
          </form>
        </div>
      </section>
    </>
  );
}
