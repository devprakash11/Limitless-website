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

import SEO from "../components/SEO";
import ServiceContentSection from "../components/seo/ServiceContentSection";

import { contactPageContent } from "../data/pageSeoContent";
import { submitContact } from "../services/contactForm";

/* =========================================================
   CONSTANTS
========================================================= */

const CONTACT_EMAIL = "help.limitlessdesign@gmail.com";
const CONTACT_PHONE = "7667583859";

const SERVICE_OPTIONS = [
  "Logo Design",
  "Social Media Banner",
  "Photo Frame Design",
  "Poster Design",
  "Business Card Design",
  "Branding Materials",
  "UI Design",
  "Custom Creative Work",
];

const INITIAL_FORM_DATA = {
  name: "",
  email: "",
  phone: "",
  service: "",
  message: "",
  website: "",
};

/* =========================================================
   VALIDATION
========================================================= */

function validateForm(formData) {
  const validationErrors = {};

  const name = formData.name.trim();
  const email = formData.email.trim();
  const phone = formData.phone.trim();
  const service = formData.service;
  const message = formData.message.trim();

  if (!name) {
    validationErrors.name = "Please enter your name.";
  }

  if (!email) {
    validationErrors.email = "Please enter your email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    validationErrors.email = "Please enter a valid email address.";
  }

  if (
    phone &&
    !/^[0-9+\-\s()]{7,20}$/.test(phone)
  ) {
    validationErrors.phone = "Please enter a valid phone number.";
  }

  if (!service) {
    validationErrors.service =
      "Please select the required service.";
  }

  if (!message) {
    validationErrors.message =
      "Please describe your project requirement.";
  } else if (message.length < 20) {
    validationErrors.message =
      "Please provide at least 20 characters about your project.";
  }

  return validationErrors;
}

/* =========================================================
   CONTACT PAGE
========================================================= */

function Contact() {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const gmailComposeLink =
    `https://mail.google.com/mail/?view=cm&fs=1` +
    `&to=${encodeURIComponent(CONTACT_EMAIL)}`;

  /* =======================================================
     FORM HANDLERS
  ====================================================== */

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);

      const firstInvalidField =
        Object.keys(validationErrors)[0];

      document
        .querySelector(`[name="${firstInvalidField}"]`)
        ?.focus();

      return;
    }

    /*
     * Honeypot protection.
     * Real users should never fill this hidden field.
     */
    if (formData.website.trim()) {
      setSubmitted(true);
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      await submitContact({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        service: formData.service,
        message: formData.message.trim(),
        website: formData.website.trim(),
      });

      setSubmitted(true);
      setFormData(INITIAL_FORM_DATA);
      setErrors({});
    } catch (error) {
      console.error("Contact form submission failed:", error);

      setSubmitError(
        error?.message ||
          "Your requirement could not be submitted. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitAnother = () => {
    setFormData(INITIAL_FORM_DATA);
    setErrors({});
    setSubmitError("");
    setSubmitted(false);
    setIsSubmitting(false);
  };

  /* =======================================================
     RENDER
  ====================================================== */

  return (
    <>
      <SEO
        title="Contact Limitless Design | Start Your Design Project"
        description="Contact Limitless Design for logo design, branding, posters, business cards, social media creatives, UI design and custom graphic design work."
        path="/contact"
        image="/logo-01.webp"
      />

      <main className="commission-page">

        {/* =================================================
            HERO
        ================================================== */}

        <section
          className="commission-hero"
          aria-labelledby="contact-page-title"
        >
          <div className="container commission-hero-container">
            <div className="commission-hero-content">

              <span className="commission-hero-label">
                <Sparkles size={16} aria-hidden="true" />
                Commission Creative Work
              </span>

              <h1 id="contact-page-title">
                Let’s create something{" "}
                <span>limitless together.</span>
              </h1>

              <p>
                Tell us about your creative requirement and
                we will help you design professional visuals
                for your brand, campaign, business, or
                digital product.
              </p>

              <div className="commission-hero-points">
                <div>
                  <CheckCircle2
                    size={18}
                    aria-hidden="true"
                  />
                  <span>Professional design support</span>
                </div>

                <div>
                  <CheckCircle2
                    size={18}
                    aria-hidden="true"
                  />
                  <span>Custom project requirements</span>
                </div>

                <div>
                  <CheckCircle2
                    size={18}
                    aria-hidden="true"
                  />
                  <span>Direct communication</span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* =================================================
            CONTACT SECTION
        ================================================== */}

        <section className="commission-section">
          <div className="container commission-layout">

            {/* =============================================
                CONTACT INFORMATION
            ============================================== */}

            <aside
              className="commission-info-card"
              aria-labelledby="contact-info-title"
            >
              <span className="commission-card-label">
                Contact Information
              </span>

              <h2 id="contact-info-title">
                Start your creative project with us
              </h2>

              <p className="commission-info-description">
                Contact Limitless Design directly or
                complete the requirement form. Your project
                details will be submitted directly to our
                team.
              </p>

              <div className="commission-contact-list">

                {/* Email */}

                <a
                  href={gmailComposeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="commission-contact-item"
                  aria-label={`Email Limitless Design at ${CONTACT_EMAIL}`}
                >
                  <span className="commission-contact-icon">
                    <Mail size={21} aria-hidden="true" />
                  </span>

                  <span className="commission-contact-copy">
                    <small>Email us</small>
                    <strong>{CONTACT_EMAIL}</strong>
                  </span>

                  <ExternalLink
                    size={17}
                    className="commission-contact-arrow"
                    aria-hidden="true"
                  />
                </a>

                {/* Phone */}

                <a
                  href={`tel:+91${CONTACT_PHONE}`}
                  className="commission-contact-item"
                  aria-label={`Call Limitless Design at +91 ${CONTACT_PHONE}`}
                >
                  <span className="commission-contact-icon">
                    <Phone size={21} aria-hidden="true" />
                  </span>

                  <span className="commission-contact-copy">
                    <small>Call us</small>
                    <strong>
                      +91 {CONTACT_PHONE}
                    </strong>
                  </span>

                  <ArrowRight
                    size={17}
                    className="commission-contact-arrow"
                    aria-hidden="true"
                  />
                </a>

                {/* Location */}

                <div className="commission-contact-item commission-location-item">
                  <span className="commission-contact-icon">
                    <MapPin
                      size={21}
                      aria-hidden="true"
                    />
                  </span>

                  <span className="commission-contact-copy">
                    <small>Location</small>
                    <strong>India</strong>
                  </span>
                </div>

              </div>

              {/* Response Information */}

              <div className="commission-response-box">
                <div>
                  <Clock3
                    size={20}
                    aria-hidden="true"
                  />
                </div>

                <span>
                  <strong>Quick response</strong>
                  We will review your project details and
                  contact you regarding the next steps.
                </span>
              </div>

              {/* Security Note */}

              <div className="commission-security-note">
                <ShieldCheck
                  size={18}
                  aria-hidden="true"
                />

                <span>
                  Your contact details are used only for
                  discussing your project.
                </span>
              </div>

            </aside>

            {/* =============================================
                FORM / SUCCESS STATE
            ============================================== */}

            <div className="commission-form-card">

              {!submitted ? (
                <>
                  {/* Form Header */}

                  <div className="commission-form-header">
                    <span className="commission-form-kicker">
                      Project Requirement
                    </span>

                    <h2>
                      Tell us about your project
                    </h2>

                    <p>
                      Complete the form below and submit your
                      project requirement directly to Limitless
                      Design.
                    </p>
                  </div>

                  {/* Contact Form */}

                  <form
                    className="commission-form"
                    onSubmit={handleSubmit}
                    noValidate
                  >
                    {/* Honeypot */}

                    <div
                      className="commission-honeypot"
                      aria-hidden="true"
                    >
                      <label htmlFor="commission-website">
                        Website
                      </label>

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

                    {/* Name + Email */}

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
                          className={
                            errors.name
                              ? "has-error"
                              : ""
                          }
                          aria-invalid={Boolean(errors.name)}
                          aria-describedby={
                            errors.name
                              ? "commission-name-error"
                              : undefined
                          }
                        />

                        {errors.name && (
                          <small
                            id="commission-name-error"
                            className="commission-error"
                          >
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
                          className={
                            errors.email
                              ? "has-error"
                              : ""
                          }
                          aria-invalid={Boolean(errors.email)}
                          aria-describedby={
                            errors.email
                              ? "commission-email-error"
                              : undefined
                          }
                        />

                        {errors.email && (
                          <small
                            id="commission-email-error"
                            className="commission-error"
                          >
                            {errors.email}
                          </small>
                        )}
                      </div>

                    </div>

                    {/* Phone + Service */}

                    <div className="commission-form-row">

                      <div className="commission-field">
                        <label htmlFor="commission-phone">
                          Phone number
                        </label>

                        <input
                          id="commission-phone"
                          type="tel"
                          name="phone"
                          placeholder="Enter your phone number"
                          autoComplete="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          className={
                            errors.phone
                              ? "has-error"
                              : ""
                          }
                          aria-invalid={Boolean(errors.phone)}
                          aria-describedby={
                            errors.phone
                              ? "commission-phone-error"
                              : undefined
                          }
                        />

                        {errors.phone && (
                          <small
                            id="commission-phone-error"
                            className="commission-error"
                          >
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
                          className={
                            errors.service
                              ? "has-error"
                              : ""
                          }
                          aria-invalid={Boolean(
                            errors.service
                          )}
                          aria-describedby={
                            errors.service
                              ? "commission-service-error"
                              : undefined
                          }
                        >
                          <option value="">
                            Select a service
                          </option>

                          {SERVICE_OPTIONS.map(
                            (service) => (
                              <option
                                key={service}
                                value={service}
                              >
                                {service}
                              </option>
                            )
                          )}
                        </select>

                        {errors.service && (
                          <small
                            id="commission-service-error"
                            className="commission-error"
                          >
                            {errors.service}
                          </small>
                        )}
                      </div>

                    </div>

                    {/* Project Details */}

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
                        className={
                          errors.message
                            ? "has-error"
                            : ""
                        }
                        aria-invalid={Boolean(
                          errors.message
                        )}
                        aria-describedby="commission-message-meta"
                      />

                      <div
                        id="commission-message-meta"
                        className="commission-message-meta"
                      >
                        {errors.message ? (
                          <small className="commission-error">
                            {errors.message}
                          </small>
                        ) : (
                          <small>
                            Add complete information for
                            an accurate response.
                          </small>
                        )}

                        <small>
                          {formData.message.length} characters
                        </small>
                      </div>
                    </div>

                    {/* Submission Error */}

                    {submitError && (
                      <div
                        className="commission-submit-error"
                        role="alert"
                      >
                        {submitError}
                      </div>
                    )}

                    {/* Submit Button */}

                    <button
                      type="submit"
                      className="commission-submit-button"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span>
                            Submitting Requirement
                          </span>

                          <LoaderCircle
                            size={19}
                            className="commission-spinner"
                            aria-hidden="true"
                          />
                        </>
                      ) : (
                        <>
                          <span>
                            Send Requirement
                          </span>

                          <Send
                            size={19}
                            aria-hidden="true"
                          />
                        </>
                      )}
                    </button>

                    <p className="commission-form-note">
                      Your requirement is submitted
                      securely without opening Gmail.
                    </p>
                  </form>
                </>
              ) : (
                /* =========================================
                   SUCCESS STATE
                ========================================== */

                <div
                  className="commission-success"
                  role="status"
                  aria-live="polite"
                >
                  <div className="commission-success-icon">
                    <CheckCircle2
                      size={48}
                      aria-hidden="true"
                    />
                  </div>

                  <span className="commission-success-label">
                    Requirement Submitted
                  </span>

                  <h2>
                    Your requirement has been submitted
                    successfully
                  </h2>

                  <p>
                    Thank you for contacting Limitless
                    Design. Your project information has
                    been submitted to our team.
                  </p>

                  <div className="commission-success-notice">
                    <Mail
                      size={20}
                      aria-hidden="true"
                    />

                    <span>
                      Our team will review your requirement
                      and contact you using the email address
                      or phone number provided.
                    </span>
                  </div>

                  <div className="commission-success-actions">
                    <button
                      type="button"
                      className="commission-submit-button"
                      onClick={handleSubmitAnother}
                    >
                      <span>
                        Submit Another Requirement
                      </span>

                      <ArrowRight
                        size={18}
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </section>

        {/* =================================================
            SEO CONTENT
        ================================================== */}

        <ServiceContentSection
          {...contactPageContent}
        />

      </main>
    </>
  );
}

export default Contact;