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
  const websiteUrl = getWebsiteUrl();
  const logoUrl = env.emailLogoUrl || `${websiteUrl}/logo-white.png`;

  await Promise.all([
    mailer.sendMail({
      from: `Limitless Design <${env.gmailUser}>`,
      to: env.contactEmail,
      replyTo: contact.email,
      subject: `New Limitless Design enquiry: ${contact.service}`,
      text: buildAdminText(contact, submittedAt, websiteUrl),
      html: buildAdminEmail(data, submittedAt, websiteUrl, logoUrl),
    }),
    mailer.sendMail({
      from: `Limitless Design <${env.gmailUser}>`,
      to: contact.email,
      replyTo: env.contactEmail,
      subject: "We received your enquiry | Limitless Design",
      text: buildCustomerText(contact, submittedAt, websiteUrl),
      html: buildCustomerEmail(data, submittedAt, websiteUrl, logoUrl),
    }),
  ]);

  return { sent: true, skipped: false };
}

function buildAdminEmail(contact, submittedAt, websiteUrl, logoUrl) {
  const replyUrl = `mailto:${encodeURIComponent(contact.email)}?subject=${encodeURIComponent(`Re: Limitless Design enquiry: ${contact.service}`)}`;

  return emailDocument({
    title: "New Limitless Design enquiry",
    preheader: `New ${contact.service} enquiry from ${contact.name}`,
    logoUrl,
    eyebrow: "New enquiry",
    heading: "A new project request has arrived.",
    intro: "A client has submitted a new requirement through the Limitless Design website. Review the details below and reply directly to the client.",
    body: `
      ${detailGrid([
        ["Client", contact.name],
        ["Service", contact.service],
        ["Email", `<a href="mailto:${contact.email}" style="color:#4f46e5;text-decoration:none;">${contact.email}</a>`],
        ["Phone", contact.phone === "Not provided" ? contact.phone : `<a href="tel:${contact.phone}" style="color:#4f46e5;text-decoration:none;">${contact.phone}</a>`],
        ["Submitted", submittedAt],
        ["Status", "NEW"],
      ])}

      <div style="margin-top:28px;font-size:12px;line-height:18px;font-weight:800;letter-spacing:1.2px;text-transform:uppercase;color:#667085;">Client message</div>
      <div style="margin-top:10px;padding:20px;background:#f8f9ff;border:1px solid #e5e7eb;border-left:4px solid #6d5dfc;border-radius:12px;font-size:15px;line-height:26px;color:#1d2939;">${contact.message}</div>

      <div style="margin-top:28px;text-align:center;">
        <a href="${replyUrl}" style="display:inline-block;padding:13px 22px;background:#6d5dfc;color:#ffffff;text-decoration:none;border-radius:10px;font-size:14px;line-height:20px;font-weight:700;">Reply to client</a>
        <a href="${websiteUrl}" style="display:inline-block;margin-left:8px;padding:12px 21px;background:#ffffff;color:#344054;text-decoration:none;border:1px solid #d0d5dd;border-radius:10px;font-size:14px;line-height:20px;font-weight:700;">Visit website</a>
      </div>
    `,
    footerNote: "This notification was generated automatically from the Limitless Design contact form.",
    websiteUrl,
  });
}

function buildCustomerEmail(contact, submittedAt, websiteUrl, logoUrl) {
  return emailDocument({
    title: "We received your enquiry | Limitless Design",
    preheader: `Your ${contact.service} enquiry has been received`,
    logoUrl,
    eyebrow: "Enquiry received",
    heading: `Thank you, ${contact.name}.`,
    intro: "Your project requirement has been received successfully. We appreciate you choosing Limitless Design and will review the information you provided.",
    body: `
      <div style="padding:20px;background:#f8f9ff;border:1px solid #e5e7eb;border-radius:14px;">
        <div style="font-size:11px;line-height:16px;font-weight:800;letter-spacing:1.1px;text-transform:uppercase;color:#667085;">Selected service</div>
        <div style="margin-top:7px;font-size:19px;line-height:27px;font-weight:800;color:#101828;">${contact.service}</div>
        <div style="margin-top:5px;font-size:12px;line-height:18px;color:#667085;">Submitted ${submittedAt}</div>
      </div>

      <div style="margin-top:28px;padding:22px;background:#ffffff;border:1px solid #eaecf0;border-radius:14px;">
        <div style="font-size:12px;line-height:18px;font-weight:800;letter-spacing:1.1px;text-transform:uppercase;color:#667085;">What happens next?</div>
        <p style="margin:9px 0 0;font-size:14px;line-height:24px;color:#475467;">Our team will review your requirement and contact you using the email address or phone number you provided. If we need any additional information, we will reach out to you.</p>
      </div>

      <div style="margin-top:28px;text-align:center;">
        <a href="${websiteUrl}" style="display:inline-block;padding:13px 22px;background:#6d5dfc;color:#ffffff;text-decoration:none;border-radius:10px;font-size:14px;line-height:20px;font-weight:700;">Visit Limitless Design</a>
      </div>
    `,
    footerNote: "If you need to add anything to your requirement, simply reply to this email.",
    websiteUrl,
  });
}

function emailDocument({ title, preheader, logoUrl, eyebrow, heading, intro, body, footerNote, websiteUrl }) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="x-apple-disable-message-reformatting">
  <title>${title}</title>
  <style>
    @media only screen and (max-width: 640px) {
      .email-shell { padding: 12px !important; }
      .email-card { width: 100% !important; }
      .email-content { padding: 30px 20px !important; }
      .email-header { padding: 24px 20px !important; }
      .email-footer { padding: 24px 20px !important; }
      .detail-cell { display:block !important; width:100% !important; padding:0 0 16px !important; }
      .detail-cell:last-child { padding-bottom:0 !important; }
      .mobile-button { display:block !important; margin:10px 0 0 !important; text-align:center !important; }
      .email-heading { font-size:27px !important; line-height:35px !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background:#f4f3ff;font-family:Arial,Helvetica,sans-serif;color:#101828;-webkit-text-size-adjust:100%;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${preheader}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;background:#f4f3ff;">
    <tr>
      <td class="email-shell" align="center" style="padding:36px 16px;">
        <table class="email-card" role="presentation" width="640" cellpadding="0" cellspacing="0" border="0" style="width:640px;max-width:640px;background:#ffffff;border:1px solid #e4e7ec;border-radius:18px;overflow:hidden;">
          <tr>
            <td class="email-header" style="padding:28px 34px;background:#080816;border-bottom:4px solid #6d5dfc;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td valign="middle">
                    <a href="${websiteUrl}" style="text-decoration:none;">
                      <img src="${logoUrl}" width="190" alt="Limitless Design" style="display:block;width:190px;max-width:100%;height:auto;border:0;outline:none;text-decoration:none;">
                    </a>
                  </td>
                  <td align="right" valign="middle" style="font-size:10px;line-height:15px;font-weight:800;letter-spacing:1.3px;text-transform:uppercase;color:#ff5fc7;">Limitless Design</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td class="email-content" style="padding:38px 34px 34px;">
              <div style="font-size:11px;line-height:17px;font-weight:800;letter-spacing:1.4px;text-transform:uppercase;color:#6d5dfc;">${eyebrow}</div>
              <h1 class="email-heading" style="margin:10px 0 12px;font-size:31px;line-height:39px;font-weight:800;letter-spacing:-0.8px;color:#101828;">${heading}</h1>
              <p style="margin:0;font-size:15px;line-height:25px;color:#667085;">${intro}</p>
              <div style="height:28px;line-height:28px;font-size:1px;">&nbsp;</div>
              ${body}
            </td>
          </tr>
          <tr>
            <td class="email-footer" style="padding:28px 34px;background:#080816;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <div style="font-size:15px;line-height:22px;font-weight:800;color:#ffffff;">Limitless Design</div>
                    <div style="margin-top:4px;font-size:12px;line-height:19px;color:#b8b5c8;">Creative design solutions, thoughtfully made.</div>
                  </td>
                </tr>
              </table>
              <div style="height:18px;line-height:18px;font-size:1px;">&nbsp;</div>
              <div style="height:1px;background:#29283a;font-size:1px;line-height:1px;">&nbsp;</div>
              <div style="padding-top:18px;font-size:12px;line-height:22px;color:#c5c2d2;">
                <strong style="color:#ffffff;">Contact us</strong><br>
                <a href="mailto:${env.contactEmail}" style="color:#d7d4e2;text-decoration:none;">${env.contactEmail}</a>
                &nbsp; | &nbsp;
                <a href="tel:${env.contactPhone.replace(/[^0-9+]/g, "")}" style="color:#d7d4e2;text-decoration:none;">${env.contactPhone}</a>
                <br>
                <a href="${websiteUrl}" style="color:#8fdfff;text-decoration:none;">${websiteUrl}</a>
              </div>
              <div style="padding-top:15px;font-size:11px;line-height:18px;color:#77748a;">${footerNote}</div>
              <div style="padding-top:10px;font-size:10px;line-height:16px;color:#5f5c70;">© ${new Date().getFullYear()} Limitless Design. All rights reserved.</div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function detailGrid(items) {
  const rows = [];

  for (let index = 0; index < items.length; index += 2) {
    const first = items[index];
    const second = items[index + 1];

    rows.push(`
      <tr>
        ${detailCell(first)}
        ${second ? detailCell(second) : '<td class="detail-cell" width="50%" style="width:50%;padding:0 0 0 12px;">&nbsp;</td>'}
      </tr>
    `);
  }

  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;padding:0;border:1px solid #e4e7ec;border-radius:14px;background:#fbfbff;">${rows.join("")}</table>`;
}

function detailCell([label, value]) {
  return `<td class="detail-cell" width="50%" valign="top" style="width:50%;padding:18px 12px 18px 18px;">
    <div style="font-size:10px;line-height:15px;font-weight:800;letter-spacing:1px;text-transform:uppercase;color:#98a2b3;">${label}</div>
    <div style="margin-top:5px;font-size:14px;line-height:21px;font-weight:700;color:#1d2939;">${value}</div>
  </td>`;
}

function buildAdminText(contact, submittedAt, websiteUrl) {
  return [
    "New Limitless Design enquiry",
    "",
    `Name: ${contact.name}`,
    `Email: ${contact.email}`,
    `Phone: ${contact.phone || "Not provided"}`,
    `Service: ${contact.service}`,
    `Submitted: ${submittedAt}`,
    "Status: NEW",
    "",
    "Message:",
    contact.message,
    "",
    `Website: ${websiteUrl}`,
  ].join("\n");
}

function buildCustomerText(contact, submittedAt, websiteUrl) {
  return [
    `Hi ${contact.name},`,
    "",
    "Thank you for contacting Limitless Design.",
    "Your project requirement has been received successfully.",
    "",
    `Service: ${contact.service}`,
    `Submitted: ${submittedAt}`,
    "",
    "Our team will review your requirement and contact you with the next steps.",
    "If you need to add anything, simply reply to this email.",
    "",
    "Contact us:",
    env.contactEmail,
    env.contactPhone,
    websiteUrl,
    "",
    "Regards,",
    "Limitless Design",
  ].join("\n");
}

function sanitizeContact(contact) {
  return {
    name: escapeHtml(contact.name),
    email: escapeHtml(contact.email),
    phone: escapeHtml(contact.phone || "Not provided"),
    service: escapeHtml(contact.service),
    message: escapeHtml(contact.message).replaceAll("\n", "<br>"),
  };
}

function getWebsiteUrl() {
  return String(env.frontendUrl || "").split(",")[0].trim().replace(/\/$/, "");
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
