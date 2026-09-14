import nodemailer from "nodemailer";
import { env } from "../config/env.js";

let transporter;

function getTransporter() {
  if (transporter) return transporter;

  if (!env.gmailUser || !env.gmailAppPassword) {
    throw new Error("Gmail SMTP is not configured.");
  }

  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: env.gmailUser,
      pass: env.gmailAppPassword,
    },
  });

  return transporter;
}

export async function sendContactEmails(contact) {
  // Never send real emails during local development.
  if (env.nodeEnv !== "production") {
    console.log("[email] Development mode: contact emails are disabled.");
    return { sent: false, skipped: true };
  }

  if (!env.contactEmail) {
    throw new Error("Admin contact email is not configured.");
  }

  const mailer = getTransporter();
  const data = sanitizeContact(contact);
  const submittedAt = formatDate(contact.created_at);

  await Promise.all([
    mailer.sendMail({
      from: `Limitless Design <${env.gmailUser}>`,
      to: env.contactEmail,
      replyTo: contact.email,
      subject: `New enquiry: ${contact.service}`,
      text: buildAdminText(contact, submittedAt),
      html: buildAdminEmail(data, submittedAt),
    }),
    mailer.sendMail({
      from: `Limitless Design <${env.gmailUser}>`,
      to: contact.email,
      replyTo: env.contactEmail,
      subject: "We received your enquiry | Limitless Design",
      text: buildCustomerText(contact, submittedAt),
      html: buildCustomerEmail(data, submittedAt),
    }),
  ]);

  return { sent: true, skipped: false };
}

function sanitizeContact(contact) {
  return {
    name: escapeHtml(contact.name),
    email: escapeHtml(contact.email),
    phone: escapeHtml(contact.phone || "Not provided"),
    service: escapeHtml(contact.service),
    message: escapeHtml(contact.message).replaceAll("\n", "<br>") ,
  };
}

function buildAdminEmail(contact, submittedAt) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>New Limitless Design enquiry</title>
  <style>
    @media only screen and (max-width: 640px) {
      .email-shell { padding: 12px !important; }
      .email-card { width: 100% !important; }
      .content { padding: 28px 22px !important; }
      .detail-cell { display: block !important; width: 100% !important; padding: 0 0 14px !important; }
      .detail-cell:last-child { padding-bottom: 0 !important; }
      .message-box { padding: 18px !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background:#f3f1ed;font-family:Arial,Helvetica,sans-serif;color:#181818;-webkit-text-size-adjust:100%;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;background:#f3f1ed;">
    <tr>
      <td class="email-shell" align="center" style="padding:32px 16px;">
        <table class="email-card" role="presentation" width="620" cellpadding="0" cellspacing="0" border="0" style="width:620px;max-width:620px;background:#ffffff;border:1px solid #e5e1da;border-radius:16px;overflow:hidden;">
          <tr>
            <td style="background:#151515;padding:28px 34px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="font-size:20px;line-height:24px;font-weight:700;letter-spacing:-0.3px;color:#ffffff;">LIMITLESS DESIGN</td>
                  <td align="right" style="font-size:11px;line-height:16px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;color:#c9a46b;">NEW ENQUIRY</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td class="content" style="padding:36px 34px 30px;">
              <p style="margin:0 0 8px;font-size:12px;line-height:18px;font-weight:700;letter-spacing:1.4px;text-transform:uppercase;color:#a17b43;">Contact request</p>
              <h1 style="margin:0 0 12px;font-size:28px;line-height:36px;font-weight:700;letter-spacing:-0.7px;color:#181818;">New design enquiry</h1>
              <p style="margin:0 0 28px;font-size:15px;line-height:24px;color:#66615b;">A new requirement has been submitted through the Limitless Design website.</p>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f8f6f2;border:1px solid #e8e3db;border-radius:12px;">
                <tr>
                  <td class="detail-cell" width="50%" valign="top" style="width:50%;padding:20px 18px 18px 20px;">
                    <div style="font-size:11px;line-height:16px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#8b857d;">Client</div>
                    <div style="margin-top:5px;font-size:15px;line-height:22px;font-weight:700;color:#181818;">${contact.name}</div>
                    <div style="margin-top:3px;font-size:13px;line-height:20px;color:#66615b;">${contact.email}</div>
                  </td>
                  <td class="detail-cell" width="50%" valign="top" style="width:50%;padding:20px 20px 18px 18px;">
                    <div style="font-size:11px;line-height:16px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#8b857d;">Service</div>
                    <div style="margin-top:5px;font-size:15px;line-height:22px;font-weight:700;color:#181818;">${contact.service}</div>
                    <div style="margin-top:3px;font-size:13px;line-height:20px;color:#66615b;">Submitted ${submittedAt}</div>
                  </td>
                </tr>
                <tr>
                  <td class="detail-cell" width="50%" valign="top" style="width:50%;padding:0 18px 20px 20px;">
                    <div style="font-size:11px;line-height:16px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#8b857d;">Phone</div>
                    <div style="margin-top:5px;font-size:14px;line-height:21px;color:#181818;">${contact.phone}</div>
                  </td>
                  <td class="detail-cell" width="50%" valign="top" style="width:50%;padding:0 20px 20px 18px;">
                    <div style="font-size:11px;line-height:16px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#8b857d;">Reply</div>
                    <div style="margin-top:5px;font-size:14px;line-height:21px;color:#181818;">Use Reply to contact the client</div>
                  </td>
                </tr>
              </table>

              <div style="height:24px;line-height:24px;font-size:1px;">&nbsp;</div>
              <div style="font-size:12px;line-height:18px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;color:#8b857d;">Client message</div>
              <div class="message-box" style="margin-top:10px;padding:20px;background:#151515;border-radius:12px;font-size:15px;line-height:25px;color:#f5f2ed;">${contact.message}</div>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 34px;border-top:1px solid #ece8e1;background:#faf9f7;">
              <p style="margin:0;font-size:12px;line-height:18px;color:#8b857d;">This notification was generated automatically by the Limitless Design contact form.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function buildCustomerEmail(contact, submittedAt) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>We received your enquiry</title>
  <style>
    @media only screen and (max-width: 640px) {
      .email-shell { padding: 12px !important; }
      .email-card { width: 100% !important; }
      .content { padding: 30px 22px !important; }
      .service-card { padding: 18px !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background:#f3f1ed;font-family:Arial,Helvetica,sans-serif;color:#181818;-webkit-text-size-adjust:100%;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;background:#f3f1ed;">
    <tr>
      <td class="email-shell" align="center" style="padding:32px 16px;">
        <table class="email-card" role="presentation" width="620" cellpadding="0" cellspacing="0" border="0" style="width:620px;max-width:620px;background:#ffffff;border:1px solid #e5e1da;border-radius:16px;overflow:hidden;">
          <tr>
            <td style="background:#151515;padding:34px;">
              <div style="font-size:20px;line-height:24px;font-weight:700;letter-spacing:-0.3px;color:#ffffff;">LIMITLESS DESIGN</div>
              <div style="margin-top:9px;font-size:11px;line-height:16px;font-weight:700;letter-spacing:1.3px;text-transform:uppercase;color:#c9a46b;">Thank you for reaching out</div>
            </td>
          </tr>
          <tr>
            <td class="content" style="padding:40px 34px 34px;">
              <div style="display:inline-block;padding:7px 11px;background:#f8f1e7;border-radius:999px;font-size:11px;line-height:16px;font-weight:700;letter-spacing:0.8px;text-transform:uppercase;color:#9a713d;">Enquiry received</div>
              <h1 style="margin:18px 0 12px;font-size:30px;line-height:38px;font-weight:700;letter-spacing:-0.8px;color:#181818;">Thanks, ${contact.name}.</h1>
              <p style="margin:0;font-size:15px;line-height:25px;color:#66615b;">Your requirement has been received successfully. We appreciate you taking the time to tell us about your project.</p>

              <div class="service-card" style="margin-top:28px;padding:22px;background:#f8f6f2;border:1px solid #e8e3db;border-radius:12px;">
                <div style="font-size:11px;line-height:16px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#8b857d;">Your selected service</div>
                <div style="margin-top:7px;font-size:18px;line-height:26px;font-weight:700;color:#181818;">${contact.service}</div>
                <div style="margin-top:4px;font-size:12px;line-height:18px;color:#8b857d;">Submitted ${submittedAt}</div>
              </div>

              <div style="margin-top:30px;padding-top:26px;border-top:1px solid #ece8e1;">
                <div style="font-size:12px;line-height:18px;font-weight:700;letter-spacing:1.1px;text-transform:uppercase;color:#8b857d;">What happens next?</div>
                <p style="margin:9px 0 0;font-size:14px;line-height:23px;color:#66615b;">We'll review your requirement and get back to you with the next steps. If we need any additional information, we'll contact you using the details you provided.</p>
              </div>

              <div style="margin-top:30px;padding:20px 0 4px;">
                <p style="margin:0;font-size:14px;line-height:23px;color:#66615b;">If you need to add anything to your enquiry, simply reply to this email.</p>
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding:26px 34px;background:#151515;">
              <div style="font-size:14px;line-height:21px;font-weight:700;color:#ffffff;">Limitless Design</div>
              <div style="margin-top:5px;font-size:12px;line-height:19px;color:#aaa49c;">Creative design solutions, thoughtfully made.</div>
              <div style="margin-top:14px;font-size:11px;line-height:17px;color:#77716a;">This is an automatic confirmation of your website enquiry.</div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function buildAdminText(contact, submittedAt) {
  return [
    "New Limitless Design enquiry",
    "",
    `Name: ${contact.name}`,
    `Email: ${contact.email}`,
    `Phone: ${contact.phone || "Not provided"}`,
    `Service: ${contact.service}`,
    `Submitted: ${submittedAt}`,
    "",
    "Message:",
    contact.message,
  ].join("\n");
}

function buildCustomerText(contact, submittedAt) {
  return [
    `Hi ${contact.name},`,
    "",
    "Thank you for contacting Limitless Design.",
    "Your requirement has been received successfully.",
    "",
    `Service: ${contact.service}`,
    `Submitted: ${submittedAt}`,
    "",
    "We'll review your requirement and get back to you with the next steps.",
    "If you need to add anything, simply reply to this email.",
    "",
    "Regards,",
    "Limitless Design",
  ].join("\n");
}

function formatDate(value) {
  if (!value) return "just now";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "just now";

  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  }).format(date);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
