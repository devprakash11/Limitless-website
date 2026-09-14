import nodemailer from "nodemailer";
import { env } from "../config/env.js";

let transporter;

const COLORS = {
  primary: "#6d5dfc",
  primaryDark: "#4f46e5",
  pink: "#ff5fc7",
  cyan: "#36d8ff",
  dark: "#080816",
  text: "#101828",
  muted: "#667085",
  border: "#e4e7ec",
  surface: "#f8f9ff",
  white: "#ffffff",
};

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
  const logoUrl = `${websiteUrl}/logo-white.png`;

  await Promise.all([
    mailer.sendMail({
      from: `Limitless Design <${env.gmailUser}>`,
      to: env.contactEmail,
      replyTo: contact.email,
      subject: `New Limitless Design enquiry: ${data.serviceText}`,
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
  const replyUrl = `mailto:${encodeURIComponent(contact.emailText)}?subject=${encodeURIComponent(`Re: Limitless Design enquiry: ${contact.serviceText}`)}`;

  return emailDocument({
    title: `New enquiry | ${contact.serviceText}`,
    preheader: `New ${contact.serviceText} enquiry from ${contact.nameText}`,
    logoUrl,
    eyebrow: "New enquiry",
    heading: "A new project request has arrived.",
    intro: "A client has submitted a new requirement through the Limitless Design website. Review the details below and reply directly to the client when ready.",
    body: `
      ${leadSummary(contact, submittedAt)}
      <div style="margin-top:28px;">
        <div style="font-size:11px;line-height:17px;font-weight:800;letter-spacing:1.4px;text-transform:uppercase;color:${COLORS.primary};">Client message</div>
        <div style="margin-top:10px;padding:20px 22px;background:${COLORS.surface};border:1px solid #e5e7eb;border-left:4px solid ${COLORS.primary};border-radius:14px;font-size:15px;line-height:27px;color:${COLORS.text};">${contact.messageHtml}</div>
      </div>
      <div style="margin-top:28px;padding:18px 20px;background:${COLORS.dark};border-radius:14px;">
        <div style="font-size:11px;line-height:17px;font-weight:800;letter-spacing:1.2px;text-transform:uppercase;color:${COLORS.pink};">Quick action</div>
        <div style="margin-top:6px;font-size:14px;line-height:22px;color:#d9d7e5;">Reply to the client or visit the website to review the available design services.</div>
      </div>
      <div style="margin-top:26px;text-align:center;">
        <a href="${replyUrl}" class="mobile-button" style="display:inline-block;padding:13px 23px;background:${COLORS.primary};color:${COLORS.white};text-decoration:none;border-radius:10px;font-size:14px;line-height:20px;font-weight:800;">Reply to client</a>
        <a href="${websiteUrl}" class="mobile-button secondary-button" style="display:inline-block;margin-left:8px;padding:12px 22px;background:${COLORS.white};color:#344054;text-decoration:none;border:1px solid #d0d5dd;border-radius:10px;font-size:14px;line-height:20px;font-weight:800;">Visit website</a>
      </div>
    `,
    footerNote: "This notification was generated automatically from the Limitless Design contact form.",
    websiteUrl,
  });
}

function buildCustomerEmail(contact, submittedAt, websiteUrl, logoUrl) {
  return emailDocument({
    title: "We received your enquiry | Limitless Design",
    preheader: `Your ${contact.serviceText} enquiry has been received`,
    logoUrl,
    eyebrow: "Enquiry received",
    heading: `Thank you, ${contact.nameText}.`,
    intro: "Your project requirement has been received successfully. We appreciate you choosing Limitless Design and will review the information you provided.",
    body: `
      <div style="padding:22px;background:${COLORS.surface};border:1px solid ${COLORS.border};border-radius:14px;">
        <div style="font-size:10px;line-height:15px;font-weight:800;letter-spacing:1.3px;text-transform:uppercase;color:#98a2b3;">Selected service</div>
        <div style="margin-top:7px;font-size:20px;line-height:28px;font-weight:800;color:${COLORS.text};">${contact.serviceText}</div>
        <div style="margin-top:6px;font-size:12px;line-height:18px;color:${COLORS.muted};">Submitted ${submittedAt}</div>
      </div>
      <div style="margin-top:18px;padding:20px;background:#ffffff;border:1px solid #eaecf0;border-radius:14px;">
        <div style="font-size:11px;line-height:17px;font-weight:800;letter-spacing:1.2px;text-transform:uppercase;color:${COLORS.primary};">Your message</div>
        <div style="margin-top:9px;font-size:14px;line-height:25px;color:#475467;">${contact.messageHtml}</div>
      </div>
      <div style="margin-top:18px;padding:20px;background:#ffffff;border:1px solid #eaecf0;border-radius:14px;">
        <div style="font-size:11px;line-height:17px;font-weight:800;letter-spacing:1.2px;text-transform:uppercase;color:${COLORS.primary};">What happens next?</div>
        <p style="margin:9px 0 0;font-size:14px;line-height:24px;color:#475467;">Our team will review your requirement and contact you using the email address or phone number you provided. If we need any additional information, we will reach out to you.</p>
      </div>
      <div style="margin-top:26px;text-align:center;">
        <a href="${websiteUrl}" class="mobile-button" style="display:inline-block;padding:13px 24px;background:${COLORS.primary};color:${COLORS.white};text-decoration:none;border-radius:10px;font-size:14px;line-height:20px;font-weight:800;">Visit Limitless Design</a>
      </div>
    `,
    footerNote: "Need to add something to your requirement? Simply reply to this email and our team will receive your message.",
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
  <meta name="format-detection" content="telephone=no,address=no,email=no,date=no,url=no">
  <title>${escapeHtml(title)}</title>
  <style>
    body { margin:0 !important; padding:0 !important; width:100% !important; background:#f3f2fb; }
    table { border-spacing:0; }
    img { border:0; display:block; max-width:100%; }
    a { text-decoration:none; }
    .email-shell { padding:42px 16px; }
    .email-card { width:640px; max-width:640px; }
    .email-content { padding:40px 38px 36px; }
    .email-header { padding:26px 38px; }
    .email-footer { padding:30px 38px; }
    .mobile-button { white-space:nowrap; }
    @media only screen and (max-width:640px) {
      .email-shell { padding:12px !important; }
      .email-card { width:100% !important; }
      .email-content { padding:30px 20px !important; }
      .email-header { padding:22px 20px !important; }
      .email-footer { padding:26px 20px !important; }
      .email-heading { font-size:27px !important; line-height:35px !important; }
      .email-logo { width:65px !important; }
      .mobile-button { display:block !important; margin:10px 0 0 !important; text-align:center !important; white-space:normal !important; }
      .detail-cell { display:block !important; width:100% !important; padding:15px 16px !important; }
      .detail-spacer { display:none !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background:#f3f2fb;font-family:Arial,Helvetica,sans-serif;color:${COLORS.text};-webkit-text-size-adjust:100%;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${escapeHtml(preheader)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;background:#f3f2fb;">
    <tr>
      <td class="email-shell" align="center" style="padding:42px 16px;">
        <table class="email-card" role="presentation" width="640" cellpadding="0" cellspacing="0" border="0" style="width:640px;max-width:640px;background:#ffffff;border:1px solid #e4e7ec;border-radius:18px;overflow:hidden;">
          <tr>
            <td class="email-header" style="padding:26px 38px;background:${COLORS.dark};border-bottom:4px solid ${COLORS.primary};">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td valign="middle" style="width:70%;">
                    <a href="${websiteUrl}" style="text-decoration:none;">
                      <img class="email-logo" src="${logoUrl}" width="190" alt="Limitless Design" style="display:block;width:190px;max-width:100%;height:auto;border:0;outline:none;text-decoration:none;">
                    </a>
                  </td>
                  <td align="right" valign="middle" style="font-size:10px;line-height:15px;font-weight:800;letter-spacing:1.4px;text-transform:uppercase;color:${COLORS.pink};">Creative Design Studio</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td class="email-content" style="padding:40px 38px 36px;">
              <div style="font-size:11px;line-height:17px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;color:${COLORS.primary};">${eyebrow}</div>
              <h1 class="email-heading" style="margin:10px 0 12px;font-size:31px;line-height:39px;font-weight:800;letter-spacing:-0.8px;color:${COLORS.text};">${heading}</h1>
              <p style="margin:0;font-size:15px;line-height:26px;color:${COLORS.muted};">${intro}</p>
              <div style="height:28px;line-height:28px;font-size:1px;">&nbsp;</div>
              ${body}
            </td>
          </tr>
          <tr>
            <td class="email-footer" style="padding:30px 38px;background:${COLORS.dark};">
              <div style="font-size:16px;line-height:23px;font-weight:800;color:#ffffff;">Limitless Design</div>
              <div style="margin-top:4px;font-size:12px;line-height:19px;color:#b8b5c8;">Creative design solutions, thoughtfully made.</div>
              <div style="height:18px;line-height:18px;font-size:1px;">&nbsp;</div>
              <div style="height:1px;background:#29283a;font-size:1px;line-height:1px;">&nbsp;</div>
              <div style="padding-top:18px;font-size:12px;line-height:22px;color:#c5c2d2;">
                <div style="font-size:10px;line-height:15px;font-weight:800;letter-spacing:1.2px;text-transform:uppercase;color:${COLORS.pink};">Contact us</div>
                <div style="margin-top:6px;">
                  <a href="mailto:${escapeHtml(env.contactEmail || "help.limitlessdesign@gmail.com")}" style="color:#ffffff;text-decoration:none;">${escapeHtml(env.contactEmail || "help.limitlessdesign@gmail.com")}</a>
                  <span style="color:#5f5c70;"> &nbsp;•&nbsp; </span>
                  <a href="tel:${String(env.contactPhone || "+91 7667583859").replace(/[^0-9+]/g, "")}" style="color:#ffffff;text-decoration:none;">${escapeHtml(env.contactPhone || "+91 7667583859")}</a>
                </div>
                <div style="margin-top:4px;"><a href="${websiteUrl}" style="color:${COLORS.cyan};text-decoration:none;">${websiteUrl}</a></div>
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

function leadSummary(contact, submittedAt) {
  const rows = [
    ["Client", contact.nameHtml],
    ["Service", contact.serviceHtml],
    ["Email", `<a href="mailto:${contact.emailText}" style="color:${COLORS.primaryDark};text-decoration:none;">${contact.emailHtml}</a>`],
    ["Phone", contact.phoneText === "Not provided" ? contact.phoneHtml : `<a href="tel:${contact.phoneText.replace(/[^0-9+]/g, "")}" style="color:${COLORS.primaryDark};text-decoration:none;">${contact.phoneHtml}</a>`],
    ["Submitted", escapeHtml(submittedAt)],
    ["Status", `<span style="display:inline-block;padding:4px 8px;background:#ede9fe;color:${COLORS.primaryDark};border-radius:6px;font-size:11px;line-height:15px;font-weight:800;">NEW</span>`],
  ];

  const cells = [];
  for (let index = 0; index < rows.length; index += 2) {
    cells.push(`<tr>${detailCell(rows[index])}${rows[index + 1] ? detailCell(rows[index + 1]) : '<td class="detail-spacer" width="50%">&nbsp;</td>'}</tr>`);
  }

  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;border:1px solid ${COLORS.border};border-radius:14px;background:#fbfbff;overflow:hidden;">${cells.join("")}</table>`;
}

function detailCell([label, value]) {
  return `<td class="detail-cell" width="50%" valign="top" style="width:50%;padding:18px 14px 18px 18px;"><div style="font-size:10px;line-height:15px;font-weight:800;letter-spacing:1px;text-transform:uppercase;color:#98a2b3;">${label}</div><div style="margin-top:5px;font-size:14px;line-height:21px;font-weight:700;color:${COLORS.text};">${value}</div></td>`;
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
    "Contact us:",
    env.contactPhone,
    env.contactEmail,
    websiteUrl,
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
    "Your message:",
    contact.message,
    "",
    "Our team will review your requirement and contact you with the next steps.",
    "If you need to add anything, simply reply to this email.",
    "",
    "Contact us:",
    env.contactPhone,
    env.contactEmail,
    websiteUrl,
    "",
    "Regards,",
    "Limitless Design",
  ].join("\n");
}

function sanitizeContact(contact) {
  const name = escapeHtml(contact.name);
  const email = escapeHtml(contact.email);
  const phone = escapeHtml(contact.phone || "Not provided");
  const service = escapeHtml(contact.service);
  const message = escapeHtml(contact.message).replaceAll("\n", "<br>");

  return {
    nameText: name,
    nameHtml: name,
    emailText: contact.email,
    emailHtml: email,
    phoneText: contact.phone || "Not provided",
    phoneHtml: phone,
    serviceText: service,
    serviceHtml: service,
    messageHtml: message,
  };
}

function getWebsiteUrl() {
  return String(env.frontendUrl || "")
    .split(",")[0]
    .trim()
    .replace(/\/$/, "");
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
