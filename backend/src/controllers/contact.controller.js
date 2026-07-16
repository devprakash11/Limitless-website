import { env } from "../config/env.js";
import { transporter } from "../config/mailer.js";
import { escapeHtml } from "../utils/escapeHtml.js";
import { validateContactPayload } from "../utils/contactValidation.js";

const buildAdminText = (data) => `
New project requirement received from the Limitless Design website.

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || "Not provided"}
Service: ${data.service}
Source: ${data.submissionSource || "Not provided"}

Project details:
${data.message}
`.trim();

const buildAdminHtml = (data) => {
  const name = escapeHtml(data.name);
  const email = escapeHtml(data.email);
  const phone = escapeHtml(data.phone || "Not provided");
  const service = escapeHtml(data.service);
  const message = escapeHtml(data.message).replaceAll("\n", "<br />");
  const source = escapeHtml(data.submissionSource || "Not provided");

  return `
    <!doctype html>
    <html>
      <body style="margin:0;background:#f5f7fb;font-family:Arial,sans-serif;color:#172033;">
        <div style="max-width:680px;margin:30px auto;padding:0 16px;">
          <div style="background:#111827;padding:24px;border-radius:16px 16px 0 0;color:#fff;">
            <p style="margin:0 0 8px;font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#a7f3d0;">Limitless Design</p>
            <h1 style="margin:0;font-size:25px;">New project requirement</h1>
          </div>
          <div style="background:#fff;padding:24px;border:1px solid #e5e7eb;border-top:0;border-radius:0 0 16px 16px;">
            <table style="width:100%;border-collapse:collapse;font-size:15px;">
              <tr><td style="padding:10px 0;color:#6b7280;width:130px;">Name</td><td style="padding:10px 0;font-weight:700;">${name}</td></tr>
              <tr><td style="padding:10px 0;color:#6b7280;">Email</td><td style="padding:10px 0;"><a href="mailto:${email}">${email}</a></td></tr>
              <tr><td style="padding:10px 0;color:#6b7280;">Phone</td><td style="padding:10px 0;">${phone}</td></tr>
              <tr><td style="padding:10px 0;color:#6b7280;">Service</td><td style="padding:10px 0;font-weight:700;">${service}</td></tr>
              <tr><td style="padding:10px 0;color:#6b7280;">Source</td><td style="padding:10px 0;word-break:break-all;">${source}</td></tr>
            </table>
            <div style="margin-top:22px;padding:18px;background:#f9fafb;border-radius:12px;border:1px solid #e5e7eb;">
              <h2 style="margin:0 0 10px;font-size:17px;">Project details</h2>
              <p style="margin:0;line-height:1.7;">${message}</p>
            </div>
            <p style="margin:20px 0 0;font-size:13px;color:#6b7280;">Reply to this email to respond directly to ${name}.</p>
          </div>
        </div>
      </body>
    </html>
  `;
};

const buildCustomerConfirmation = (data) => ({
  text: `Hi ${data.name},\n\nThank you for contacting Limitless Design. We received your ${data.service} requirement and will review the details.\n\nRegards,\nLimitless Design`,
  html: `
    <!doctype html>
    <html>
      <body style="margin:0;background:#f5f7fb;font-family:Arial,sans-serif;color:#172033;">
        <div style="max-width:640px;margin:30px auto;padding:0 16px;">
          <div style="background:#ffffff;padding:28px;border:1px solid #e5e7eb;border-radius:16px;">
            <p style="margin:0 0 10px;font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#2563eb;">Limitless Design</p>
            <h1 style="margin:0 0 16px;font-size:24px;">We received your requirement</h1>
            <p style="margin:0 0 14px;line-height:1.7;">Hi ${escapeHtml(data.name)},</p>
            <p style="margin:0 0 14px;line-height:1.7;">Thank you for contacting Limitless Design. We received your <strong>${escapeHtml(data.service)}</strong> requirement and will review the details.</p>
            <p style="margin:20px 0 0;line-height:1.7;">Regards,<br /><strong>Limitless Design</strong></p>
          </div>
        </div>
      </body>
    </html>
  `
});

export const submitContactForm = async (req, res, next) => {
  try {
    const validation = validateContactPayload(req.body);

    // Honeypot: return a normal-looking success response, but send no email.
    if (validation.data.website) {
      return res.status(200).json({
        success: true,
        message: "Your requirement has been submitted successfully."
      });
    }

    if (!validation.isValid) {
      return res.status(422).json({
        success: false,
        message: "Please correct the highlighted fields.",
        errors: validation.errors
      });
    }

    const data = validation.data;
    const safeSubjectName = data.name.replace(/[\r\n]/g, " ");
    const safeSubjectService = data.service.replace(/[\r\n]/g, " ");

    await transporter.sendMail({
      from: `"${env.mail.fromName}" <${env.mail.fromEmail}>`,
      to: env.mail.adminEmail,
      replyTo: data.email,
      subject: `New ${safeSubjectService} Requirement from ${safeSubjectName}`,
      text: buildAdminText(data),
      html: buildAdminHtml(data)
    });

    if (env.mail.sendCustomerConfirmation) {
      const confirmation = buildCustomerConfirmation(data);

      try {
        await transporter.sendMail({
          from: `"${env.mail.fromName}" <${env.mail.fromEmail}>`,
          to: data.email,
          replyTo: env.mail.adminEmail,
          subject: "We received your Limitless Design requirement",
          text: confirmation.text,
          html: confirmation.html
        });
      } catch (error) {
        // The main admin notification was already delivered, so do not fail
        // the visitor's submission only because the confirmation email failed.
        console.error("Customer confirmation email failed:", error.message);
      }
    }

    return res.status(201).json({
      success: true,
      message: "Your requirement has been submitted successfully."
    });
  } catch (error) {
    return next(error);
  }
};
