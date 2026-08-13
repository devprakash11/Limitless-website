import { getMailAccount, getMailer } from "../config/mailer.js";
import { escapeHtml, htmlWithLineBreaks } from "../utils/escapeHtml.js";

function getOwnerEmailHtml({ name, email, phone, service, message }) {
  return `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#171923">
      <h2>New Project Requirement</h2>

      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(phone || "Not provided")}</p>
      <p><strong>Service:</strong> ${escapeHtml(service)}</p>

      <hr>

      <p>${htmlWithLineBreaks(message)}</p>
    </div>
  `;
}

function getCustomerEmailHtml({ name, service, message }) {
  return `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#171923">
      <h2>Hello ${escapeHtml(name)},</h2>

      <p>
        Thank you for contacting <strong>Limitless Design</strong>.
      </p>

      <p>
        We have received your project requirement and our team will get back
        to you within 24 hours.
      </p>

      <hr>

      <p><strong>Service:</strong> ${escapeHtml(service)}</p>

      <p>${htmlWithLineBreaks(message)}</p>

      <br>

      <p>
        Regards,<br>
        Limitless Design Team
      </p>
    </div>
  `;
}

export async function sendProjectRequirementEmails(contact) {
  const mailer = getMailer();
  const mailAccount = getMailAccount();

  const safeSubjectService = contact.service.replace(/[\r\n]+/g, " ").slice(0, 100);
  const safeSubjectName = contact.name.replace(/[\r\n]+/g, " ").slice(0, 80);

  // Send the website owner email first. If this fails, do not tell the
  // customer their requirement was received.
  await mailer.sendMail({
    from: `"Limitless Design Website" <${mailAccount}>`,
    to: mailAccount,
    replyTo: contact.email,
    subject: `New ${safeSubjectService} Requirement from ${safeSubjectName}`,
    html: getOwnerEmailHtml(contact),
  });

  // Customer acknowledgement.
  await mailer.sendMail({
    from: `"Limitless Design" <${mailAccount}>`,
    to: contact.email,
    subject: "We've received your project requirement",
    html: getCustomerEmailHtml(contact),
  });
}
