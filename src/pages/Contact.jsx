import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  ExternalLink,
  LoaderCircle,
  Mail,
  MapPin,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const receiverEmail = "help.limitlessdesign@gmail.com";
const contactNumber = "7667583859";

const serviceOptions = [
  "Logo Design",
  "Social Media Banner",
  "Photo Frame Design",
  "Poster Design",
  "Business Card Design",
  "Branding Materials",
  "UI Design",
  "Custom Creative Work",
];

const initialFormData = {
  name: "",
  email: "",
  phone: "",
  service: "",
  message: "",
  website: "",
};

function Contact() {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const gmailComposeLink =
    "https://mail.google.com/mail/?view=cm&fs=1" +
    `&to=${encodeURIComponent(receiverEmail)}`;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        [name]: "",
      }));
    }

    if (submitError) {
      setSubmitError("");
    }
  };

  const validateForm = () => {
    const validationErrors = {};

    if (!formData.name.trim()) {
      validationErrors.name = "Please enter your name.";
    }

    if (!formData.email.trim()) {
      validationErrors.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      validationErrors.email = "Please enter a valid email address.";
    }

    if (
      formData.phone.trim() &&
      !/^[0-9+\-\s()]{8,15}$/.test(formData.phone.trim())
    ) {
      validationErrors.phone = "Please enter a valid phone number.";
    }

    if (!formData.service) {
      validationErrors.service = "Please select the required service.";
    }

    if (!formData.message.trim()) {
      validationErrors.message = "Please describe your project requirement.";
    } else if (formData.message.trim().length < 20) {
      validationErrors.message =
        "Please provide at least 20 characters about your project.";
    }

    return validationErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);

      const firstErrorField = Object.keys(validationErrors)[0];

      document.querySelector(`[name="${firstErrorField}"]`)?.focus();

      return;
    }

    /*
      Hidden honeypot field.
      Normal users will leave this empty.
    */
    if (formData.website.trim()) {
      setSubmitted(true);
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");
    setErrors({});

    try {
      const response = await fetch("/.netlify/functions/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          service: formData.service,
          message: formData.message.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit requirement.");
      }

      setSubmitted(true);
      setFormData(initialFormData);
      setErrors({});
      setSubmitError("");
    } catch (error) {
      console.error(error);

      setSubmitError(
        error.message ||
          "Your requirement could not be submitted. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitAnother = () => {
    setFormData(initialFormData);
    setErrors({});
    setSubmitError("");
    setSubmitted(false);
    setIsSubmitting(false);
  };

  return (
    <main className="commission-page">
      <section className="commission-hero">
        <div className="container commission-hero-container">
          <div className="commission-hero-content">
            <span className="commission-hero-label">
              <Sparkles size={16} />
              Commission Creative Work
            </span>

            <h1>
              Let’s create something <span>limitless together.</span>
            </h1>

            <p>
              Tell us about your creative requirement and we will help you
              design professional visuals for your brand, campaign, business, or
              digital product.
            </p>

            <div className="commission-hero-points">
              <div>
                <CheckCircle2 size={18} />
                Professional design support
              </div>

              <div>
                <CheckCircle2 size={18} />
                Custom project requirements
              </div>

              <div>
                <CheckCircle2 size={18} />
                Direct communication
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="commission-section">
        <div className="container commission-layout">
          <aside className="commission-info-card">
            <span className="commission-card-label">Contact Information</span>

            <h2>Start your creative project with us</h2>

            <p className="commission-info-description">
              Contact Limitless Design directly or complete the requirement
              form. Your project details will be submitted directly to our team.
            </p>

            <div className="commission-contact-list">
              <a
                href={gmailComposeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="commission-contact-item"
                aria-label={`Email ${receiverEmail}`}
              >
                <span className="commission-contact-icon">
                  <Mail size={21} />
                </span>

                <span className="commission-contact-copy">
                  <small>Email us</small>
                  <strong>{receiverEmail}</strong>
                </span>

                <ExternalLink size={17} className="commission-contact-arrow" />
              </a>

              <a
                href={`tel:+91${contactNumber}`}
                className="commission-contact-item"
                aria-label={`Call +91 ${contactNumber}`}
              >
                <span className="commission-contact-icon">
                  <Phone size={21} />
                </span>

                <span className="commission-contact-copy">
                  <small>Call us</small>
                  <strong>+91 {contactNumber}</strong>
                </span>

                <ArrowRight size={17} className="commission-contact-arrow" />
              </a>

              <div className="commission-contact-item commission-location-item">
                <span className="commission-contact-icon">
                  <MapPin size={21} />
                </span>

                <span className="commission-contact-copy">
                  <small>Location</small>
                  <strong>India</strong>
                </span>
              </div>
            </div>

            <div className="commission-response-box">
              <div>
                <Clock3 size={20} />
              </div>

              <span>
                <strong>Quick response</strong>
                We will review your project details and contact you regarding
                the next steps.
              </span>
            </div>

            <div className="commission-security-note">
              <ShieldCheck size={18} />

              <span>
                Your contact details are used only for discussing your project.
              </span>
            </div>
          </aside>

          <div className="commission-form-card">
            {!submitted ? (
              <>
                <div className="commission-form-header">
                  <span className="commission-form-kicker">
                    Project Requirement
                  </span>

                  <h2>Tell us about your project</h2>

                  <p>
                    Complete the form below and submit your project requirement
                    directly to Limitless Design.
                  </p>
                </div>

                <form
                  className="commission-form"
                  onSubmit={handleSubmit}
                  noValidate
                >
                  <div className="commission-honeypot" aria-hidden="true">
                    <label htmlFor="commission-website">Website</label>

                    <input
                      id="commission-website"
                      type="text"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.website}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="commission-form-row">
                    <div className="commission-field">
                      <label htmlFor="commission-name">
                        Your name <span>*</span>
                      </label>

                      <input
                        id="commission-name"
                        type="text"
                        name="name"
                        placeholder="Enter your full name"
                        autoComplete="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={errors.name ? "has-error" : ""}
                      />

                      {errors.name && (
                        <small className="commission-error">
                          {errors.name}
                        </small>
                      )}
                    </div>

                    <div className="commission-field">
                      <label htmlFor="commission-email">
                        Email address <span>*</span>
                      </label>

                      <input
                        id="commission-email"
                        type="email"
                        name="email"
                        placeholder="Enter your email address"
                        autoComplete="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={errors.email ? "has-error" : ""}
                      />

                      {errors.email && (
                        <small className="commission-error">
                          {errors.email}
                        </small>
                      )}
                    </div>
                  </div>

                  <div className="commission-form-row">
                    <div className="commission-field">
                      <label htmlFor="commission-phone">Phone number</label>

                      <input
                        id="commission-phone"
                        type="tel"
                        name="phone"
                        placeholder="Enter your phone number"
                        autoComplete="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        className={errors.phone ? "has-error" : ""}
                      />

                      {errors.phone && (
                        <small className="commission-error">
                          {errors.phone}
                        </small>
                      )}
                    </div>

                    <div className="commission-field">
                      <label htmlFor="commission-service">
                        Service required <span>*</span>
                      </label>

                      <select
                        id="commission-service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className={errors.service ? "has-error" : ""}
                      >
                        <option value="">Select a service</option>

                        {serviceOptions.map((service) => (
                          <option key={service} value={service}>
                            {service}
                          </option>
                        ))}
                      </select>

                      {errors.service && (
                        <small className="commission-error">
                          {errors.service}
                        </small>
                      )}
                    </div>
                  </div>

                  <div className="commission-field">
                    <label htmlFor="commission-message">
                      Project details <span>*</span>
                    </label>

                    <textarea
                      id="commission-message"
                      name="message"
                      rows={7}
                      placeholder="Describe your project, design style, required size, preferred colors, deadline, and other important details."
                      value={formData.message}
                      onChange={handleChange}
                      className={errors.message ? "has-error" : ""}
                    />

                    <div className="commission-message-meta">
                      {errors.message ? (
                        <small className="commission-error">
                          {errors.message}
                        </small>
                      ) : (
                        <small>
                          Add complete information for an accurate response.
                        </small>
                      )}

                      <small>{formData.message.length} characters</small>
                    </div>
                  </div>

                  {submitError && (
                    <div className="commission-submit-error" role="alert">
                      {submitError}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="commission-submit-button"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span>Submitting Requirement</span>

                        <LoaderCircle
                          size={19}
                          className="commission-spinner"
                        />
                      </>
                    ) : (
                      <>
                        <span>Send Requirement</span>
                        <Send size={19} />
                      </>
                    )}
                  </button>

                  <p className="commission-form-note">
                    Clicking Send Requirement will submit your information
                    directly without opening Gmail.
                  </p>
                </form>
              </>
            ) : (
              <div
                className="commission-success"
                role="status"
                aria-live="polite"
              >
                <div className="commission-success-icon">
                  <CheckCircle2 size={48} />
                </div>

                <span className="commission-success-label">
                  Requirement Submitted
                </span>

                <h2>Your requirement has been submitted successfully</h2>

                <p>
                  Thank you for contacting Limitless Design. Your project
                  information has been submitted to our team.
                </p>

                <div className="commission-success-notice">
                  <Mail size={20} />

                  <span>
                    Our team will review your requirement and contact you using
                    the email address or phone number provided.
                  </span>
                </div>

                <div className="commission-success-actions">
                  <button
                    type="button"
                    className="commission-submit-button"
                    onClick={handleSubmitAnother}
                  >
                    <span>Submit Another Requirement</span>

                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Contact;
