import nodemailer from "nodemailer";

const BRAND = {
  name: "Limitless Design",
  email: "help.limitlessdesign@gmail.com",
  website: "https://limitlessdesign.netlify.app",

  // Public logo URL
  logo: "https://limitlessdesign.netlify.app/logo.webp",

  instagram:
    "https://www.instagram.com/limitless_design11?igsh=a245ZDk1emF1bXJu&utm_source=qr",

  whatsapp: "https://wa.me/917667583859",

  phone: "+91 76675 83859",
};

/* =========================================================
   SECURITY - ESCAPE USER HTML
========================================================= */

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

/* =========================================================
   ADMIN EMAIL TEMPLATE
========================================================= */

function adminMailTemplate({
  name,
  email,
  phone,
  service,
  message,
}) {
  return `
  <!DOCTYPE html>

  <html lang="en">

  <head>

    <meta charset="UTF-8" />

    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0"
    />

    <title>New Project Requirement</title>

  </head>

  <body
    style="
      margin:0;
      padding:0;
      background:#f4f6fb;
      font-family:Arial, Helvetica, sans-serif;
      color:#1f2937;
    "
  >

    <table
      role="presentation"
      width="100%"
      cellspacing="0"
      cellpadding="0"
      border="0"
      style="
        background:#f4f6fb;
        margin:0;
        padding:24px 12px;
      "
    >

      <tr>

        <td align="center">

          <table
            role="presentation"
            width="100%"
            cellspacing="0"
            cellpadding="0"
            border="0"
            style="
              max-width:700px;
              background:#ffffff;
              border-radius:18px;
              overflow:hidden;
              box-shadow:0 8px 30px rgba(0,0,0,0.08);
            "
          >

            <!-- =============================================
                 HEADER
            ============================================== -->

            <tr>

              <td
                style="
                  background:#162650;
                  background:linear-gradient(
                    135deg,
                    #0f172a,
                    #1e3a8a
                  );
                  padding:28px 32px;
                "
              >

                <table
                  role="presentation"
                  width="100%"
                  cellspacing="0"
                  cellpadding="0"
                  border="0"
                >

                  <tr>

                    <!-- Logo -->

                    <td
                      style="
                        vertical-align:middle;
                      "
                    >

                      <div
                        style="
                          display:inline-block;
                          background:#ffffff;
                          padding:10px 16px;
                          border-radius:12px;
                        "
                      >

                        <img
                          src="${BRAND.logo}"
                          alt="${BRAND.name}"
                          width="180"
                          style="
                            width:auto;
                            height:48px;
                            max-width:180px;
                            display:block;
                            border:0;
                          "
                        />

                      </div>

                    </td>

                    <!-- Header text -->

                    <td
                      align="right"
                      style="
                        vertical-align:middle;
                        padding-left:20px;
                      "
                    >

                      <div
                        style="
                          color:#ffffff;
                          font-size:12px;
                          letter-spacing:1px;
                          text-transform:uppercase;
                          opacity:0.9;
                        "
                      >
                        New Inquiry Alert
                      </div>

                      <div
                        style="
                          color:#ffffff;
                          font-size:24px;
                          line-height:1.3;
                          font-weight:700;
                          margin-top:6px;
                        "
                      >
                        New Project Requirement
                      </div>

                    </td>

                  </tr>

                </table>

              </td>

            </tr>

            <!-- =============================================
                 INTRO
            ============================================== -->

            <tr>

              <td
                style="
                  padding:30px 32px 12px;
                "
              >

                <h2
                  style="
                    margin:0 0 10px;
                    font-size:24px;
                    line-height:1.4;
                    color:#111827;
                  "
                >
                  A new customer has submitted a requirement.
                </h2>

                <p
                  style="
                    margin:0;
                    font-size:15px;
                    line-height:1.7;
                    color:#4b5563;
                  "
                >
                  A new lead has arrived from your website
                  contact form. Review the project details
                  below and contact the client as soon as
                  possible.
                </p>

              </td>

            </tr>

            <!-- =============================================
                 CLIENT NAME
            ============================================== -->

            <tr>

              <td
                style="
                  padding:18px 32px 0;
                "
              >

                <div
                  style="
                    background:#f8fafc;
                    border:1px solid #e5e7eb;
                    border-radius:14px;
                    padding:18px;
                  "
                >

                  <div
                    style="
                      font-size:12px;
                      color:#6b7280;
                      text-transform:uppercase;
                      letter-spacing:0.8px;
                    "
                  >
                    Client Name
                  </div>

                  <div
                    style="
                      font-size:18px;
                      line-height:1.5;
                      font-weight:700;
                      color:#111827;
                      margin-top:5px;
                    "
                  >
                    ${escapeHtml(name)}
                  </div>

                </div>

              </td>

            </tr>

            <!-- =============================================
                 SERVICE
            ============================================== -->

            <tr>

              <td
                style="
                  padding:14px 32px 10px;
                "
              >

                <div
                  style="
                    background:#f8fafc;
                    border:1px solid #e5e7eb;
                    border-radius:14px;
                    padding:18px;
                  "
                >

                  <div
                    style="
                      font-size:12px;
                      color:#6b7280;
                      text-transform:uppercase;
                      letter-spacing:0.8px;
                    "
                  >
                    Service Required
                  </div>

                  <div
                    style="
                      font-size:18px;
                      line-height:1.5;
                      font-weight:700;
                      color:#111827;
                      margin-top:5px;
                    "
                  >
                    ${escapeHtml(service)}
                  </div>

                </div>

              </td>

            </tr>

            <!-- =============================================
                 CLIENT DETAILS
            ============================================== -->

            <tr>

              <td
                style="
                  padding:14px 32px 10px;
                "
              >

                <div
                  style="
                    font-size:18px;
                    font-weight:700;
                    color:#111827;
                    margin-bottom:12px;
                  "
                >
                  Client Details
                </div>

                <table
                  role="presentation"
                  width="100%"
                  cellspacing="0"
                  cellpadding="0"
                  border="0"
                  style="
                    border:1px solid #e5e7eb;
                    border-radius:14px;
                    overflow:hidden;
                  "
                >

                  <!-- Email -->

                  <tr>

                    <td
                      style="
                        background:#f9fafb;
                        padding:14px 16px;
                        width:140px;
                        font-weight:700;
                        color:#374151;
                      "
                    >
                      Email
                    </td>

                    <td
                      style="
                        padding:14px 16px;
                        color:#111827;
                      "
                    >

                      <a
                        href="mailto:${escapeHtml(email)}"
                        style="
                          color:#2563eb;
                          text-decoration:none;
                        "
                      >
                        ${escapeHtml(email)}
                      </a>

                    </td>

                  </tr>

                  <!-- Phone -->

                  <tr>

                    <td
                      style="
                        background:#f9fafb;
                        padding:14px 16px;
                        font-weight:700;
                        color:#374151;
                        border-top:1px solid #e5e7eb;
                      "
                    >
                      Phone
                    </td>

                    <td
                      style="
                        padding:14px 16px;
                        color:#111827;
                        border-top:1px solid #e5e7eb;
                      "
                    >
                      ${escapeHtml(phone || "Not provided")}
                    </td>

                  </tr>

                  <!-- Service -->

                  <tr>

                    <td
                      style="
                        background:#f9fafb;
                        padding:14px 16px;
                        font-weight:700;
                        color:#374151;
                        border-top:1px solid #e5e7eb;
                      "
                    >
                      Service
                    </td>

                    <td
                      style="
                        padding:14px 16px;
                        color:#111827;
                        border-top:1px solid #e5e7eb;
                      "
                    >
                      ${escapeHtml(service)}
                    </td>

                  </tr>

                </table>

              </td>

            </tr>

            <!-- =============================================
                 PROJECT MESSAGE
            ============================================== -->

            <tr>

              <td
                style="
                  padding:18px 32px 10px;
                "
              >

                <div
                  style="
                    font-size:18px;
                    font-weight:700;
                    color:#111827;
                    margin-bottom:12px;
                  "
                >
                  Project Message
                </div>

                <div
                  style="
                    background:#f8fafc;
                    border:1px solid #e5e7eb;
                    border-left:4px solid #2563eb;
                    border-radius:14px;
                    padding:18px;
                    font-size:15px;
                    line-height:1.8;
                    color:#374151;
                  "
                >
                  ${nl2br(message)}
                </div>

              </td>

            </tr>

            <!-- =============================================
                 ADMIN ACTION BUTTONS
            ============================================== -->

            <tr>

              <td
                style="
                  padding:22px 32px 30px;
                "
              >

                <a
                  href="mailto:${escapeHtml(email)}"
                  style="
                    display:inline-block;
                    background:#2563eb;
                    color:#ffffff;
                    text-decoration:none;
                    font-size:14px;
                    font-weight:700;
                    padding:14px 24px;
                    border-radius:10px;
                    margin-right:8px;
                    margin-bottom:8px;
                  "
                >
                  Reply to Client
                </a>

                ${
                  phone
                    ? `
                      <a
                        href="tel:${escapeHtml(phone)}"
                        style="
                          display:inline-block;
                          background:#111827;
                          color:#ffffff;
                          text-decoration:none;
                          font-size:14px;
                          font-weight:700;
                          padding:14px 24px;
                          border-radius:10px;
                          margin-bottom:8px;
                        "
                      >
                        Call Client
                      </a>
                    `
                    : ""
                }

              </td>

            </tr>

            <!-- =============================================
                 FOOTER
            ============================================== -->

            <tr>

              <td
                style="
                  padding:28px 32px;
                  background:#f8fafc;
                  border-top:1px solid #e5e7eb;
                "
              >

                <div
                  style="
                    font-size:14px;
                    line-height:1.9;
                    color:#6b7280;
                  "
                >

                  <strong
                    style="
                      color:#111827;
                      font-size:15px;
                    "
                  >
                    ${BRAND.name}
                  </strong>

                  <br>

                  Website:
                  <a
                    href="${BRAND.website}"
                    style="
                      color:#2563eb;
                      text-decoration:none;
                    "
                  >
                    ${BRAND.website}
                  </a>

                  <br>

                  Email:
                  <a
                    href="mailto:${BRAND.email}"
                    style="
                      color:#2563eb;
                      text-decoration:none;
                    "
                  >
                    ${BRAND.email}
                  </a>

                  <br>

                  Phone:
                  <a
                    href="tel:${BRAND.phone}"
                    style="
                      color:#2563eb;
                      text-decoration:none;
                    "
                  >
                    ${BRAND.phone}
                  </a>

                </div>

                <!-- Social links -->

                <div
                  style="
                    margin-top:16px;
                    font-size:14px;
                  "
                >

                  <a
                    href="${BRAND.instagram}"
                    target="_blank"
                    style="
                      color:#2563eb;
                      text-decoration:none;
                      margin-right:16px;
                      font-weight:600;
                    "
                  >
                    Instagram
                  </a>

                  <a
                    href="${BRAND.whatsapp}"
                    target="_blank"
                    style="
                      color:#2563eb;
                      text-decoration:none;
                      font-weight:600;
                    "
                  >
                    WhatsApp
                  </a>

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

/* =========================================================
   CLIENT EMAIL TEMPLATE
========================================================= */

function clientMailTemplate({
  name,
  service,
  message,
}) {
  return `
  <!DOCTYPE html>

  <html lang="en">

  <head>

    <meta charset="UTF-8" />

    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0"
    />

    <title>
      We've received your project requirement
    </title>

  </head>

  <body
    style="
      margin:0;
      padding:0;
      background:#f4f6fb;
      font-family:Arial, Helvetica, sans-serif;
      color:#1f2937;
    "
  >

    <table
      role="presentation"
      width="100%"
      cellspacing="0"
      cellpadding="0"
      border="0"
      style="
        background:#f4f6fb;
        margin:0;
        padding:24px 12px;
      "
    >

      <tr>

        <td align="center">

          <table
            role="presentation"
            width="100%"
            cellspacing="0"
            cellpadding="0"
            border="0"
            style="
              max-width:700px;
              background:#ffffff;
              border-radius:18px;
              overflow:hidden;
              box-shadow:0 8px 30px rgba(0,0,0,0.08);
            "
          >

            <!-- =============================================
                 CLIENT HEADER
            ============================================== -->

            <tr>

              <td
                align="center"
                style="
                  background:#162650;
                  background:linear-gradient(
                    135deg,
                    #0f172a,
                    #1e3a8a
                  );
                  padding:32px;
                  text-align:center;
                "
              >

                <!-- WHITE LOGO CONTAINER -->

                <table
                  role="presentation"
                  cellspacing="0"
                  cellpadding="0"
                  border="0"
                  align="center"
                  style="
                    margin:0 auto 18px;
                  "
                >

                  <tr>

                    <td
                      align="center"
                      style="
                        background:#ffffff;
                        padding:12px 20px;
                        border-radius:14px;
                      "
                    >

                      <img
                        src="${BRAND.logo}"
                        alt="${BRAND.name}"
                        width="190"
                        style="
                          width:auto;
                          height:52px;
                          max-width:190px;
                          display:block;
                          margin:0 auto;
                          border:0;
                        "
                      />

                    </td>

                  </tr>

                </table>

                <!-- Thank you -->

                <div
                  style="
                    font-size:28px;
                    line-height:1.3;
                    font-weight:700;
                    color:#ffffff;
                    margin-bottom:10px;
                  "
                >
                  Thank You!
                </div>

                <div
                  style="
                    font-size:15px;
                    line-height:1.7;
                    color:#ffffff;
                    max-width:540px;
                    margin:0 auto;
                  "
                >
                  We've received your project requirement
                  and our team will review it shortly.
                </div>

              </td>

            </tr>

            <!-- =============================================
                 GREETING
            ============================================== -->

            <tr>

              <td
                style="
                  padding:30px 32px 10px;
                "
              >

                <h2
                  style="
                    margin:0 0 12px;
                    font-size:25px;
                    line-height:1.4;
                    color:#111827;
                  "
                >
                  Hello ${escapeHtml(name)},
                </h2>

                <p
                  style="
                    margin:0 0 14px;
                    font-size:15px;
                    line-height:1.8;
                    color:#4b5563;
                  "
                >
                  Thank you for contacting
                  <strong>${BRAND.name}</strong>.
                  We appreciate your interest in working
                  with us.
                </p>

                <p
                  style="
                    margin:0;
                    font-size:15px;
                    line-height:1.8;
                    color:#4b5563;
                  "
                >
                  Your requirement has been successfully
                  received. Our team will get back to you
                  within
                  <strong>24 hours</strong>
                  with the next steps.
                </p>

              </td>

            </tr>

            <!-- =============================================
                 SELECTED SERVICE
            ============================================== -->

            <tr>

              <td
                style="
                  padding:18px 32px 8px;
                "
              >

                <div
                  style="
                    background:#f8fafc;
                    border:1px solid #e5e7eb;
                    border-radius:14px;
                    padding:18px;
                  "
                >

                  <div
                    style="
                      font-size:12px;
                      color:#6b7280;
                      text-transform:uppercase;
                      letter-spacing:0.8px;
                    "
                  >
                    Selected Service
                  </div>

                  <div
                    style="
                      font-size:20px;
                      font-weight:700;
                      color:#111827;
                      margin-top:6px;
                    "
                  >
                    ${escapeHtml(service)}
                  </div>

                </div>

              </td>

            </tr>

            <!-- =============================================
                 SUBMITTED MESSAGE
            ============================================== -->

            <tr>

              <td
                style="
                  padding:18px 32px 8px;
                "
              >

                <div
                  style="
                    font-size:18px;
                    font-weight:700;
                    color:#111827;
                    margin-bottom:12px;
                  "
                >
                  Your Submitted Message
                </div>

                <div
                  style="
                    background:#f8fafc;
                    border:1px solid #e5e7eb;
                    border-left:4px solid #2563eb;
                    border-radius:14px;
                    padding:18px;
                    font-size:15px;
                    line-height:1.8;
                    color:#374151;
                  "
                >
                  ${nl2br(message)}
                </div>

              </td>

            </tr>

            <!-- =============================================
                 WHAT HAPPENS NEXT
            ============================================== -->

            <tr>

              <td
                style="
                  padding:24px 32px 10px;
                "
              >

                <div
                  style="
                    font-size:18px;
                    font-weight:700;
                    color:#111827;
                    margin-bottom:14px;
                  "
                >
                  What happens next?
                </div>

                <!-- Step 1 -->

                <div
                  style="
                    background:#f8fafc;
                    border:1px solid #e5e7eb;
                    border-radius:12px;
                    padding:14px 16px;
                    color:#374151;
                    font-size:15px;
                    line-height:1.6;
                    margin-bottom:10px;
                  "
                >
                  <strong style="color:#2563eb;">
                    01.
                  </strong>

                  Our team will review your requirement
                  carefully.
                </div>

                <!-- Step 2 -->

                <div
                  style="
                    background:#f8fafc;
                    border:1px solid #e5e7eb;
                    border-radius:12px;
                    padding:14px 16px;
                    color:#374151;
                    font-size:15px;
                    line-height:1.6;
                    margin-bottom:10px;
                  "
                >
                  <strong style="color:#2563eb;">
                    02.
                  </strong>

                  We may contact you if we need additional
                  project information.
                </div>

                <!-- Step 3 -->

                <div
                  style="
                    background:#f8fafc;
                    border:1px solid #e5e7eb;
                    border-radius:12px;
                    padding:14px 16px;
                    color:#374151;
                    font-size:15px;
                    line-height:1.6;
                  "
                >
                  <strong style="color:#2563eb;">
                    03.
                  </strong>

                  You will receive professional guidance
                  and the next steps from our team.
                </div>

              </td>

            </tr>

            <!-- =============================================
                 CTA
            ============================================== -->

            <tr>

              <td
                style="
                  padding:22px 32px 30px;
                "
              >

                <a
                  href="${BRAND.website}"
                  target="_blank"
                  style="
                    display:inline-block;
                    background:#2563eb;
                    color:#ffffff;
                    text-decoration:none;
                    font-size:14px;
                    font-weight:700;
                    padding:14px 24px;
                    border-radius:10px;
                    margin-right:8px;
                    margin-bottom:8px;
                  "
                >
                  Visit Website
                </a>

                <a
                  href="${BRAND.whatsapp}"
                  target="_blank"
                  style="
                    display:inline-block;
                    background:#111827;
                    color:#ffffff;
                    text-decoration:none;
                    font-size:14px;
                    font-weight:700;
                    padding:14px 24px;
                    border-radius:10px;
                    margin-bottom:8px;
                  "
                >
                  Chat on WhatsApp
                </a>

              </td>

            </tr>

            <!-- =============================================
                 CLIENT FOOTER
            ============================================== -->

            <tr>

              <td
                style="
                  padding:28px 32px;
                  background:#f8fafc;
                  border-top:1px solid #e5e7eb;
                "
              >

                <div
                  style="
                    font-size:14px;
                    line-height:1.9;
                    color:#6b7280;
                  "
                >

                  <strong
                    style="
                      color:#111827;
                      font-size:15px;
                    "
                  >
                    ${BRAND.name}
                  </strong>

                  <br>

                  Website:

                  <a
                    href="${BRAND.website}"
                    target="_blank"
                    style="
                      color:#2563eb;
                      text-decoration:none;
                    "
                  >
                    ${BRAND.website}
                  </a>

                  <br>

                  Email:

                  <a
                    href="mailto:${BRAND.email}"
                    style="
                      color:#2563eb;
                      text-decoration:none;
                    "
                  >
                    ${BRAND.email}
                  </a>

                  <br>

                  Phone:

                  <a
                    href="tel:${BRAND.phone}"
                    style="
                      color:#2563eb;
                      text-decoration:none;
                    "
                  >
                    ${BRAND.phone}
                  </a>

                </div>

                <!-- Social -->

                <div
                  style="
                    margin-top:16px;
                    font-size:14px;
                  "
                >

                  <a
                    href="${BRAND.instagram}"
                    target="_blank"
                    style="
                      color:#2563eb;
                      text-decoration:none;
                      margin-right:16px;
                      font-weight:600;
                    "
                  >
                    Instagram
                  </a>

                  <a
                    href="${BRAND.whatsapp}"
                    target="_blank"
                    style="
                      color:#2563eb;
                      text-decoration:none;
                      font-weight:600;
                    "
                  >
                    WhatsApp
                  </a>

                </div>

                <p
                  style="
                    margin:18px 0 0;
                    font-size:12px;
                    line-height:1.7;
                    color:#9ca3af;
                  "
                >
                  This email was sent because you submitted
                  a project requirement on the
                  ${BRAND.name} website.
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

/* =========================================================
   NETLIFY FUNCTION
========================================================= */

export async function handler(event) {

  /* -------------------------------------------------------
     METHOD CHECK
  -------------------------------------------------------- */

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        success: false,
        error: "Method Not Allowed",
      }),
    };
  }

  try {

    /* -----------------------------------------------------
       PARSE BODY
    ------------------------------------------------------ */

    const {
      name,
      email,
      phone,
      service,
      message,
    } = JSON.parse(event.body || "{}");

    /* -----------------------------------------------------
       REQUIRED FIELD VALIDATION
    ------------------------------------------------------ */

    if (
      !name ||
      !email ||
      !service ||
      !message
    ) {
      return {
        statusCode: 400,

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          success: false,
          error: "Please fill all required fields.",
        }),
      };
    }

    /* -----------------------------------------------------
       ENVIRONMENT VARIABLES
    ------------------------------------------------------ */

    if (
      !process.env.GMAIL_USER ||
      !process.env.GMAIL_APP_PASSWORD
    ) {
      console.error(
        "Missing Gmail environment variables."
      );

      return {
        statusCode: 500,

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          success: false,
          error:
            "Email service is currently unavailable.",
        }),
      };
    }

    /* -----------------------------------------------------
       NODEMAILER
    ------------------------------------------------------ */

    const transporter =
      nodemailer.createTransport({

        service: "gmail",

        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_APP_PASSWORD,
        },

      });

    /* -----------------------------------------------------
       ADMIN EMAIL
    ------------------------------------------------------ */

    await transporter.sendMail({

      from:
        `"Limitless Design Website" <${process.env.GMAIL_USER}>`,

      to:
        process.env.GMAIL_USER,

      replyTo:
        email,

      subject:
        `New ${service} Requirement from ${name}`,

      html:
        adminMailTemplate({
          name,
          email,
          phone,
          service,
          message,
        }),

    });

    /* -----------------------------------------------------
       CLIENT EMAIL
    ------------------------------------------------------ */

    await transporter.sendMail({

      from:
        `"Limitless Design" <${process.env.GMAIL_USER}>`,

      to:
        email,

      replyTo:
        BRAND.email,

      subject:
        "We've received your project requirement",

      html:
        clientMailTemplate({
          name,
          service,
          message,
        }),

    });

    /* -----------------------------------------------------
       SUCCESS
    ------------------------------------------------------ */

    return {

      statusCode: 200,

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        success: true,
        message:
          "Project requirement submitted successfully.",
      }),

    };

  } catch (err) {

    /* -----------------------------------------------------
       SERVER ERROR
    ------------------------------------------------------ */

    console.error(
      "Send email error:",
      err
    );

    return {

      statusCode: 500,

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        success: false,
        error:
          "Unable to send your requirement right now. Please try again later.",
      }),

    };

  }
}