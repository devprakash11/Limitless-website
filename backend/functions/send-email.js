import nodemailer from "nodemailer";

const BRAND = {
  name: "Limitless Design",
  email: "help.limitlessdesign@gmail.com",
  website: "https://limitlessdesign.netlify.app",
  logo: "https://limitlessdesign.netlify.app/logo-01.webp", // use full public logo URL
  instagram: "https://www.instagram.com/limitless_design11?igsh=a245ZDk1emF1bXJu&utm_source=qr",
  // facebook: "https://facebook.com/yourusername",
  // linkedin: "https://linkedin.com/in/yourusername",
  whatsapp: "https://wa.me/917665783859",
  phone: "+91 76675 83859",
};

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function nl2br(value = "") {
  return escapeHtml(value).replace(/\n/g, "<br>");
}

function adminMailTemplate({ name, email, phone, service, message }) {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>New Project Requirement</title>
  </head>
  <body style="margin:0; padding:0; background:#f4f6fb; font-family:Arial, Helvetica, sans-serif; color:#1f2937;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f6fb; margin:0; padding:24px 0;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:700px; background:#ffffff; border-radius:18px; overflow:hidden; box-shadow:0 8px 30px rgba(0,0,0,0.08);">
            
            <!-- Header -->
            <tr>
              <td style="background:linear-gradient(135deg,#0f172a,#1e3a8a); padding:28px 32px;">
                <table role="presentation" width="100%">
                  <tr>
                    <td style="vertical-align:middle;">
                      <img src="${BRAND.logo}" alt="${BRAND.name}" style="height:52px; max-width:180px; display:block; object-fit:contain;" />
                    </td>
                    <td align="right" style="vertical-align:middle;">
                      <div style="color:#ffffff; font-size:12px; letter-spacing:1px; text-transform:uppercase; opacity:0.9;">
                        New Inquiry Alert
                      </div>
                      <div style="color:#ffffff; font-size:24px; font-weight:700; margin-top:6px;">
                        New Project Requirement
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Intro -->
            <tr>
              <td style="padding:30px 32px 12px;">
                <h2 style="margin:0 0 10px; font-size:24px; color:#111827;">
                  A new customer has submitted a requirement.
                </h2>
                <p style="margin:0; font-size:15px; line-height:1.7; color:#4b5563;">
                  A new lead has arrived from your website contact form. Review the project details below and contact the client as soon as possible.
                </p>
              </td>
            </tr>

            <!-- Summary cards -->
            <tr>
              <td style="padding:18px 32px 10px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                  <tr>
                    <td style="padding:0 0 14px;">
                      <div style="background:#f8fafc; border:1px solid #e5e7eb; border-radius:14px; padding:18px;">
                        <div style="font-size:12px; color:#6b7280; text-transform:uppercase; letter-spacing:0.8px;">Client Name</div>
                        <div style="font-size:18px; font-weight:700; color:#111827; margin-top:5px;">${escapeHtml(name)}</div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:0 0 14px;">
                      <div style="background:#f8fafc; border:1px solid #e5e7eb; border-radius:14px; padding:18px;">
                        <div style="font-size:12px; color:#6b7280; text-transform:uppercase; letter-spacing:0.8px;">Service Required</div>
                        <div style="font-size:18px; font-weight:700; color:#111827; margin-top:5px;">${escapeHtml(service)}</div>
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Client details -->
            <tr>
              <td style="padding:8px 32px 10px;">
                <div style="font-size:18px; font-weight:700; color:#111827; margin-bottom:12px;">Client Details</div>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #e5e7eb; border-radius:14px; overflow:hidden;">
                  <tr>
                    <td style="background:#f9fafb; padding:14px 16px; width:160px; font-weight:700; color:#374151;">Email</td>
                    <td style="padding:14px 16px; color:#111827;">
                      <a href="mailto:${escapeHtml(email)}" style="color:#2563eb; text-decoration:none;">${escapeHtml(email)}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="background:#f9fafb; padding:14px 16px; width:160px; font-weight:700; color:#374151; border-top:1px solid #e5e7eb;">Phone</td>
                    <td style="padding:14px 16px; color:#111827; border-top:1px solid #e5e7eb;">
                      ${escapeHtml(phone || "Not provided")}
                    </td>
                  </tr>
                  <tr>
                    <td style="background:#f9fafb; padding:14px 16px; width:160px; font-weight:700; color:#374151; border-top:1px solid #e5e7eb;">Service</td>
                    <td style="padding:14px 16px; color:#111827; border-top:1px solid #e5e7eb;">
                      ${escapeHtml(service)}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Message -->
            <tr>
              <td style="padding:18px 32px 10px;">
                <div style="font-size:18px; font-weight:700; color:#111827; margin-bottom:12px;">Project Message</div>
                <div style="background:#f8fafc; border:1px solid #e5e7eb; border-left:4px solid #2563eb; border-radius:14px; padding:18px; font-size:15px; line-height:1.8; color:#374151;">
                  ${nl2br(message)}
                </div>
              </td>
            </tr>

            <!-- CTA -->
            <tr>
              <td style="padding:22px 32px 10px;">
                <a href="mailto:${escapeHtml(email)}" style="display:inline-block; background:#2563eb; color:#ffffff; text-decoration:none; font-weight:700; padding:14px 24px; border-radius:10px; margin-right:10px;">
                  Reply to Client
                </a>
                ${
                  phone
                    ? `<a href="tel:${escapeHtml(phone)}" style="display:inline-block; background:#111827; color:#ffffff; text-decoration:none; font-weight:700; padding:14px 24px; border-radius:10px;">
                        Call Client
                      </a>`
                    : ""
                }
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding:30px 32px; border-top:1px solid #e5e7eb;">
                <div style="font-size:14px; line-height:1.8; color:#6b7280;">
                  <strong style="color:#111827;">${BRAND.name}</strong><br>
                  Website: <a href="${BRAND.website}" style="color:#2563eb; text-decoration:none;">${BRAND.website}</a><br>
                  Email: <a href="mailto:${BRAND.email}" style="color:#2563eb; text-decoration:none;">${BRAND.email}</a><br>
                  Phone: ${BRAND.phone}
                </div>

                <div style="margin-top:16px;">
                  <a href="${BRAND.instagram}" style="color:#2563eb; text-decoration:none; margin-right:14px;">Instagram</a>
                  <a href="${BRAND.facebook}" style="color:#2563eb; text-decoration:none; margin-right:14px;">Facebook</a>
                  <a href="${BRAND.linkedin}" style="color:#2563eb; text-decoration:none; margin-right:14px;">LinkedIn</a>
                  <a href="${BRAND.whatsapp}" style="color:#2563eb; text-decoration:none;">WhatsApp</a>
                </div>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
}

function clientMailTemplate({ name, service, message }) {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>We've received your project requirement</title>
  </head>
  <body style="margin:0; padding:0; background:#f4f6fb; font-family:Arial, Helvetica, sans-serif; color:#1f2937;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f6fb; margin:0; padding:24px 0;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:700px; background:#ffffff; border-radius:18px; overflow:hidden; box-shadow:0 8px 30px rgba(0,0,0,0.08);">
            
            <!-- Header -->
            <tr>
              <td style="background:linear-gradient(135deg,#0f172a,#1e3a8a); padding:28px 32px; text-align:center;">
                <img src="${BRAND.logo}" alt="${BRAND.name}" style="height:58px; max-width:190px; display:block; margin:0 auto 14px; object-fit:contain;" />
                <div style="font-size:28px; font-weight:700; color:#ffffff; margin-bottom:8px;">
                  Thank You!
                </div>
                <div style="font-size:15px; line-height:1.7; color:rgba(255,255,255,0.92); max-width:540px; margin:0 auto;">
                  We've received your project requirement and our team will review it shortly.
                </div>
              </td>
            </tr>

            <!-- Greeting -->
            <tr>
              <td style="padding:30px 32px 10px;">
                <h2 style="margin:0 0 12px; font-size:25px; color:#111827;">
                  Hello ${escapeHtml(name)},
                </h2>
                <p style="margin:0 0 14px; font-size:15px; line-height:1.8; color:#4b5563;">
                  Thank you for contacting <strong>${BRAND.name}</strong>. We appreciate your interest in working with us.
                </p>
                <p style="margin:0; font-size:15px; line-height:1.8; color:#4b5563;">
                  Your requirement has been successfully received. Our team will get back to you within <strong>24 hours</strong> with the next steps.
                </p>
              </td>
            </tr>

            <!-- Service card -->
            <tr>
              <td style="padding:18px 32px 8px;">
                <div style="background:#f8fafc; border:1px solid #e5e7eb; border-radius:14px; padding:18px;">
                  <div style="font-size:12px; color:#6b7280; text-transform:uppercase; letter-spacing:0.8px;">Selected Service</div>
                  <div style="font-size:20px; font-weight:700; color:#111827; margin-top:6px;">${escapeHtml(service)}</div>
                </div>
              </td>
            </tr>

            <!-- Submitted message -->
            <tr>
              <td style="padding:18px 32px 8px;">
                <div style="font-size:18px; font-weight:700; color:#111827; margin-bottom:12px;">Your Submitted Message</div>
                <div style="background:#f8fafc; border:1px solid #e5e7eb; border-left:4px solid #2563eb; border-radius:14px; padding:18px; font-size:15px; line-height:1.8; color:#374151;">
                  ${nl2br(message)}
                </div>
              </td>
            </tr>

            <!-- Why choose us -->
            <tr>
              <td style="padding:22px 32px 10px;">
                <div style="font-size:18px; font-weight:700; color:#111827; margin-bottom:12px;">What happens next?</div>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                  <tr>
                    <td style="padding:0 0 12px;">
                      <div style="background:#ffffff; border:1px solid #e5e7eb; border-radius:12px; padding:14px 16px; color:#374151; font-size:15px;">
                        ✅ Our team will review your requirement carefully.
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:0 0 12px;">
                      <div style="background:#ffffff; border:1px solid #e5e7eb; border-radius:12px; padding:14px 16px; color:#374151; font-size:15px;">
                        ✅ We may contact you for more project details if needed.
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:0 0 12px;">
                      <div style="background:#ffffff; border:1px solid #e5e7eb; border-radius:12px; padding:14px 16px; color:#374151; font-size:15px;">
                        ✅ You will receive a professional response and guidance from our team.
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- CTA -->
            <tr>
              <td style="padding:20px 32px 10px; text-align:left;">
                <a href="${BRAND.website}" style="display:inline-block; background:#2563eb; color:#ffffff; text-decoration:none; font-weight:700; padding:14px 24px; border-radius:10px; margin-right:10px;">
                  Visit Website
                </a>
                <a href="${BRAND.whatsapp}" style="display:inline-block; background:#111827; color:#ffffff; text-decoration:none; font-weight:700; padding:14px 24px; border-radius:10px;">
                  Chat on WhatsApp
                </a>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding:30px 32px; border-top:1px solid #e5e7eb;">
                <div style="font-size:14px; line-height:1.8; color:#6b7280;">
                  <strong style="color:#111827;">${BRAND.name}</strong><br>
                  Website: <a href="${BRAND.website}" style="color:#2563eb; text-decoration:none;">${BRAND.website}</a><br>
                  Email: <a href="mailto:${BRAND.email}" style="color:#2563eb; text-decoration:none;">${BRAND.email}</a><br>
                  Phone: ${BRAND.phone}
                </div>

                <div style="margin-top:16px;">
                  <a href="${BRAND.instagram}" style="color:#2563eb; text-decoration:none; margin-right:14px;">Instagram</a>
                  <a href="${BRAND.facebook}" style="color:#2563eb; text-decoration:none; margin-right:14px;">Facebook</a>
                  <a href="${BRAND.linkedin}" style="color:#2563eb; text-decoration:none; margin-right:14px;">LinkedIn</a>
                  <a href="${BRAND.whatsapp}" style="color:#2563eb; text-decoration:none;">WhatsApp</a>
                </div>

                <p style="margin:18px 0 0; font-size:12px; line-height:1.7; color:#9ca3af;">
                  This email was sent because you submitted a project requirement on the ${BRAND.name} website.
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
}

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({
        success: false,
        error: "Method Not Allowed",
      }),
    };
  }

  try {
    const { name, email, phone, service, message } = JSON.parse(event.body);

    if (!name || !email || !service || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          success: false,
          error: "Please fill all required fields.",
        }),
      };
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Admin mail
    await transporter.sendMail({
      from: `"Limitless Design Website" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: `New ${service} Requirement from ${name}`,
      html: adminMailTemplate({
        name,
        email,
        phone,
        service,
        message,
      }),
    });

    // Client mail
    await transporter.sendMail({
      from: `"Limitless Design" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "We've received your project requirement",
      html: clientMailTemplate({
        name,
        service,
        message,
      }),
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
      }),
    };
  } catch (err) {
    console.error(err);

    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        error: err.message,
      }),
    };
  }
}