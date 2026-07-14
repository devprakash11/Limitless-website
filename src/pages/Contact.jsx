import { Mail, MapPin, Phone, Send } from "lucide-react";

function Contact() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          {/* <span className="section-label dark-label">Contact Us</span> */}
          <h1>Commission Creative Work</h1>
          <p>
            Share your design requirement and our creative team will help you
            build professional visuals for your brand, campaign, business, or
            digital product.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container contact-grid">
          <div className="contact-content">
            <span className="section-label">Get In Touch</span>

            <h2>Let’s create something limitless</h2>

            <p>
              Whether you need a logo, poster, UI design, branding kit, social
              media creative, or custom campaign design, Limitless Design is
              ready to help.
            </p>

            <div className="contact-list">
              <div>
                <Mail size={22} />
                <span>hello@limitlessdesign.com</span>
              </div>

              <div>
                <Phone size={22} />
                <span>+91 98765 43210</span>
              </div>

              <div>
                <MapPin size={22} />
                <span>India</span>
              </div>
            </div>
          </div>

          <form className="contact-form">
            <div className="form-row">
              <input type="text" placeholder="Your Name" />
              <input type="email" placeholder="Email Address" />
            </div>

            <input type="text" placeholder="Service Required" />

            <textarea
              rows="6"
              placeholder="Tell us about your project requirement"
            ></textarea>

            <button type="button" className="primary-btn">
              Send Requirement <Send size={18} />
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

export default Contact;
