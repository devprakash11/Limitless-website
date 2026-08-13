import nodemailer from "nodemailer";

/* =========================================================
   BRAND CONFIGURATION
========================================================= */

const BRAND = {
  name: "Limitless Design",

  email: "help.limitlessdesign@gmail.com",

  website: "https://limitlessdesign.netlify.app",

  logo: "https://limitlessdesign.netlify.app/logo.webp",

  instagram:
    "https://www.instagram.com/limitless_design11",

  // Contact number: 7667583859
  phoneDisplay: "+91 7667583859",

  phoneRaw: "+91 7667583859",

  // Direct WhatsApp chat
  whatsapp:
    "https://wa.me/917667583859",
};

/* =========================================================
   SECURITY HELPERS
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
  return escapeHtml(value).replace(/\r?\n/g, "<br>");
}

function cleanSubject(value = "") {
  return String(value)
    .replace(/[\r\n]+/g, " ")
    .trim();
}

/* =========================================================
   SHARED RESPONSIVE CSS
========================================================= */

const EMAIL_CSS = `
<style>

  body {
    margin: 0 !important;
    padding: 0 !important;
  }

  img {
    border: 0;
    outline: none;
    text-decoration: none;
  }

  table {
    border-collapse: separate;
  }

  @media only screen and (max-width: 600px) {

    .ld-email-wrapper {
      padding: 12px 8px !important;
    }

    .ld-email-shell {
      width: 100% !important;
      max-width: 100% !important;
      border-radius: 12px !important;
    }

    .ld-content {
      padding-left: 20px !important;
      padding-right: 20px !important;
    }

    .ld-header {
      padding: 24px 20px !important;
    }

    .ld-admin-header-table,
    .ld-admin-header-row,
    .ld-admin-logo-cell,
    .ld-admin-title-cell {
      display: block !important;
      width: 100% !important;
    }

    .ld-admin-logo-cell {
      text-align: center !important;
    }

    .ld-admin-logo {
      margin: 0 auto 18px !important;
    }

    .ld-admin-title-cell {
      text-align: center !important;
      padding-left: 0 !important;
    }

    .ld-cta-table,
    .ld-cta-row,
    .ld-cta-cell {
      display: block !important;
      width: 100% !important;
    }

    .ld-cta-spacer {
      display: block !important;
      width: 100% !important;
      height: 12px !important;
      line-height: 12px !important;
      font-size: 12px !important;
    }

    .ld-cta-button {
      display: block !important;
      width: 100% !important;
      box-sizing: border-box !important;
      text-align: center !important;
      margin: 0 !important;
    }

    .ld-details-label {
      width: 95px !important;
    }

  }

</style>
`;

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

  ${EMAIL_CSS}

</head>

<body
  style="
    margin:0;
    padding:0;
    background:#f4f6fb;
    font-family:Arial,Helvetica,sans-serif;
    color:#1f2937;
  "
>

  <table
    role="presentation"
    width="100%"
    cellspacing="0"
    cellpadding="0"
    border="0"
    class="ld-email-wrapper"
    style="
      width:100%;
      background:#f4f6fb;
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
          class="ld-email-shell"
          style="
            width:100%;
            max-width:700px;
            background:#ffffff;
            border-radius:18px;
            overflow:hidden;
            border:1px solid #e5e7eb;
          "
        >

          <!-- ===========================================
               HEADER
          ============================================ -->

          <tr>

            <td
              class="ld-header"
              style="
                background:#ffffff;
                padding:28px 32px;
                border-bottom:1px solid #e5e7eb;
              "
            >

              <table
                role="presentation"
                width="100%"
                cellspacing="0"
                cellpadding="0"
                border="0"
                class="ld-admin-header-table"
              >

                <tr class="ld-admin-header-row">

                  <!-- Logo -->

                  <td
                    class="ld-admin-logo-cell"
                    style="
                      vertical-align:middle;
                    "
                  >

                    <img
                      src="${BRAND.logo}"
                      alt="${BRAND.name}"
                      width="180"
                      class="ld-admin-logo"
                      style="
                        width:auto;
                        height:55px;
                        max-width:180px;
                        display:block;
                      "
                    />

                  </td>

                  <!-- Heading -->

                  <td
                    align="right"
                    class="ld-admin-title-cell"
                    style="
                      vertical-align:middle;
                      padding-left:20px;
                    "
                  >

                    <div
                      style="
                        color:#2563eb;
                        font-size:12px;
                        font-weight:700;
                        letter-spacing:1px;
                        text-transform:uppercase;
                      "
                    >
                      New Inquiry Alert
                    </div>

                    <div
                      style="
                        color:#111827;
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

          <!-- ===========================================
               INTRO
          ============================================ -->

          <tr>

            <td
              class="ld-content"
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

          <!-- ===========================================
               CLIENT NAME
          ============================================ -->

          <tr>

            <td
              class="ld-content"
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
                    color:#6b7280;
                    font-size:12px;
                    font-weight:700;
                    text-transform:uppercase;
                    letter-spacing:0.8px;
                  "
                >
                  Client Name
                </div>

                <div
                  style="
                    color:#111827;
                    font-size:19px;
                    line-height:1.5;
                    font-weight:700;
                    margin-top:6px;
                  "
                >
                  ${escapeHtml(name)}
                </div>

              </div>

            </td>

          </tr>

          <!-- ===========================================
               SERVICE
          ============================================ -->

          <tr>

            <td
              class="ld-content"
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
                    color:#6b7280;
                    font-size:12px;
                    font-weight:700;
                    text-transform:uppercase;
                    letter-spacing:0.8px;
                  "
                >
                  Service Required
                </div>

                <div
                  style="
                    color:#111827;
                    font-size:19px;
                    line-height:1.5;
                    font-weight:700;
                    margin-top:6px;
                  "
                >
                  ${escapeHtml(service)}
                </div>

              </div>

            </td>

          </tr>

          <!-- ===========================================
               CLIENT DETAILS
          ============================================ -->

          <tr>

            <td
              class="ld-content"
              style="
                padding:14px 32px 10px;
              "
            >

              <div
                style="
                  color:#111827;
                  font-size:18px;
                  font-weight:700;
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
                  width:100%;
                  border:1px solid #e5e7eb;
                  border-radius:14px;
                  overflow:hidden;
                "
              >

                <!-- Email -->

                <tr>

                  <td
                    class="ld-details-label"
                    style="
                      width:140px;
                      background:#f9fafb;
                      padding:14px 16px;
                      font-size:14px;
                      font-weight:700;
                      color:#374151;
                    "
                  >
                    Email
                  </td>

                  <td
                    style="
                      padding:14px 16px;
                      font-size:14px;
                      color:#111827;
                      word-break:break-word;
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
                    class="ld-details-label"
                    style="
                      background:#f9fafb;
                      padding:14px 16px;
                      font-size:14px;
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
                      font-size:14px;
                      color:#111827;
                      border-top:1px solid #e5e7eb;
                    "
                  >
                    ${
                      phone
                        ? `
                          <a
                            href="tel:${escapeHtml(phone)}"
                            style="
                              color:#2563eb;
                              text-decoration:none;
                            "
                          >
                            ${escapeHtml(phone)}
                          </a>
                        `
                        : "Not provided"
                    }
                  </td>

                </tr>

                <!-- Service -->

                <tr>

                  <td
                    class="ld-details-label"
                    style="
                      background:#f9fafb;
                      padding:14px 16px;
                      font-size:14px;
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
                      font-size:14px;
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

          <!-- ===========================================
               PROJECT MESSAGE
          ============================================ -->

          <tr>

            <td
              class="ld-content"
              style="
                padding:18px 32px 10px;
              "
            >

              <div
                style="
                  color:#111827;
                  font-size:18px;
                  font-weight:700;
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
                  color:#374151;
                  font-size:15px;
                  line-height:1.8;
                "
              >
                ${nl2br(message)}
              </div>

            </td>

          </tr>

          <!-- ===========================================
               ADMIN BUTTONS
          ============================================ -->

          <tr>

            <td
              class="ld-content"
              style="
                padding:22px 32px 30px;
              "
            >

              <table
                role="presentation"
                cellspacing="0"
                cellpadding="0"
                border="0"
                class="ld-cta-table"
              >

                <tr class="ld-cta-row">

                  <td
                    class="ld-cta-cell"
                    style="vertical-align:top;"
                  >

                    <a
                      href="mailto:${escapeHtml(email)}"
                      class="ld-cta-button"
                      style="
                        display:inline-block;
                        background:#2563eb;
                        color:#ffffff;
                        text-decoration:none;
                        font-size:14px;
                        font-weight:700;
                        padding:14px 24px;
                        border-radius:10px;
                        box-sizing:border-box;
                      "
                    >
                      Reply to Client
                    </a>

                  </td>

                  ${
                    phone
                      ? `
                        <td
                          class="ld-cta-spacer"
                          width="10"
                          style="
                            width:10px;
                            font-size:1px;
                            line-height:1px;
                          "
                        >
                          &nbsp;
                        </td>

                        <td
                          class="ld-cta-cell"
                          style="vertical-align:top;"
                        >

                          <a
                            href="tel:${escapeHtml(phone)}"
                            class="ld-cta-button"
                            style="
                              display:inline-block;
                              background:#111827;
                              color:#ffffff;
                              text-decoration:none;
                              font-size:14px;
                              font-weight:700;
                              padding:14px 24px;
                              border-radius:10px;
                              box-sizing:border-box;
                            "
                          >
                            Call Client
                          </a>

                        </td>
                      `
                      : ""
                  }

                </tr>

              </table>

            </td>

          </tr>

          <!-- ===========================================
               ADMIN FOOTER
          ============================================ -->

          <tr>

            <td
              class="ld-content"
              style="
                padding:28px 32px;
                background:#f8fafc;
                border-top:1px solid #e5e7eb;
              "
            >

              <div
                style="
                  color:#6b7280;
                  font-size:14px;
                  line-height:1.9;
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
                  href="tel:${BRAND.phoneRaw}"
                  style="
                    color:#2563eb;
                    text-decoration:none;
                  "
                >
                  ${BRAND.phoneDisplay}
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
                  rel="noopener noreferrer"
                  style="
                    color:#2563eb;
                    text-decoration:none;
                    margin-right:18px;
                    font-weight:700;
                  "
                >
                  Instagram
                </a>

                <a
                  href="${BRAND.whatsapp}"
                  target="_blank"
                  rel="noopener noreferrer"
                  style="
                    color:#16a34a;
                    text-decoration:none;
                    font-weight:700;
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

  ${EMAIL_CSS}

</head>

<body
  style="
    margin:0;
    padding:0;
    background:#f4f6fb;
    font-family:Arial,Helvetica,sans-serif;
    color:#1f2937;
  "
>

  <table
    role="presentation"
    width="100%"
    cellspacing="0"
    cellpadding="0"
    border="0"
    class="ld-email-wrapper"
    style="
      width:100%;
      background:#f4f6fb;
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
          class="ld-email-shell"
          style="
            width:100%;
            max-width:700px;
            background:#ffffff;
            border-radius:18px;
            overflow:hidden;
            border:1px solid #e5e7eb;
          "
        >

          <!-- ===========================================
               CLIENT HEADER - WHITE
          ============================================ -->

          <tr>

            <td
              align="center"
              class="ld-header"
              style="
                background:#ffffff;
                padding:32px;
                text-align:center;
                border-bottom:1px solid #e5e7eb;
              "
            >

              <!-- Logo -->

              <img
                src="${BRAND.logo}"
                alt="${BRAND.name}"
                width="190"
                style="
                  width:auto;
                  height:60px;
                  max-width:190px;
                  display:block;
                  margin:0 auto 20px;
                "
              />

              <div
                style="
                  color:#111827;
                  font-size:29px;
                  line-height:1.3;
                  font-weight:700;
                  margin-bottom:10px;
                "
              >
                Thank You!
              </div>

              <div
                style="
                  color:#4b5563;
                  font-size:15px;
                  line-height:1.7;
                  max-width:540px;
                  margin:0 auto;
                "
              >
                We've received your project requirement
                and our team will review it shortly.
              </div>

            </td>

          </tr>

          <!-- ===========================================
               GREETING
          ============================================ -->

          <tr>

            <td
              class="ld-content"
              style="
                padding:30px 32px 10px;
              "
            >

              <h2
                style="
                  margin:0 0 12px;
                  color:#111827;
                  font-size:25px;
                  line-height:1.4;
                "
              >
                Hello ${escapeHtml(name)},
              </h2>

              <p
                style="
                  margin:0 0 14px;
                  color:#4b5563;
                  font-size:15px;
                  line-height:1.8;
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
                  color:#4b5563;
                  font-size:15px;
                  line-height:1.8;
                "
              >
                Your requirement has been successfully
                received. Our team will get back to you
                within <strong>24 hours</strong> with
                the next steps.
              </p>

            </td>

          </tr>

          <!-- ===========================================
               SELECTED SERVICE
          ============================================ -->

          <tr>

            <td
              class="ld-content"
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
                    color:#6b7280;
                    font-size:12px;
                    font-weight:700;
                    text-transform:uppercase;
                    letter-spacing:0.8px;
                  "
                >
                  Selected Service
                </div>

                <div
                  style="
                    color:#111827;
                    font-size:20px;
                    font-weight:700;
                    margin-top:6px;
                  "
                >
                  ${escapeHtml(service)}
                </div>

              </div>

            </td>

          </tr>

          <!-- ===========================================
               MESSAGE
          ============================================ -->

          <tr>

            <td
              class="ld-content"
              style="
                padding:18px 32px 8px;
              "
            >

              <div
                style="
                  color:#111827;
                  font-size:18px;
                  font-weight:700;
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
                  color:#374151;
                  font-size:15px;
                  line-height:1.8;
                "
              >
                ${nl2br(message)}
              </div>

            </td>

          </tr>

          <!-- ===========================================
               NEXT STEPS
          ============================================ -->

          <tr>

            <td
              class="ld-content"
              style="
                padding:24px 32px 10px;
              "
            >

              <div
                style="
                  color:#111827;
                  font-size:18px;
                  font-weight:700;
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

                Our team will carefully review your
                project requirement.

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

                We may contact you if additional
                project information is required.

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

          <!-- ===========================================
               CTA BUTTONS
          ============================================ -->

          <tr>

            <td
              class="ld-content"
              style="
                padding:22px 32px 30px;
              "
            >

              <table
                role="presentation"
                cellspacing="0"
                cellpadding="0"
                border="0"
                class="ld-cta-table"
              >

                <tr class="ld-cta-row">

                  <!-- Website -->

                  <td
                    class="ld-cta-cell"
                    style="
                      vertical-align:top;
                    "
                  >

                    <a
                      href="${BRAND.website}"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="ld-cta-button"
                      style="
                        display:inline-block;
                        background:#2563eb;
                        color:#ffffff;
                        text-decoration:none;
                        font-size:14px;
                        font-weight:700;
                        padding:14px 24px;
                        border-radius:10px;
                        box-sizing:border-box;
                        text-align:center;
                      "
                    >
                      Visit Website
                    </a>

                  </td>

                  <!-- Space between buttons -->

                  <td
                    class="ld-cta-spacer"
                    width="12"
                    style="
                      width:12px;
                      font-size:1px;
                      line-height:1px;
                    "
                  >
                    &nbsp;
                  </td>

                  <!-- WhatsApp -->

                  <td
                    class="ld-cta-cell"
                    style="
                      vertical-align:top;
                    "
                  >

                    <a
                      href="${BRAND.whatsapp}"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="ld-cta-button"
                      style="
                        display:inline-block;
                        background:#16a34a;
                        color:#ffffff;
                        text-decoration:none;
                        font-size:14px;
                        font-weight:700;
                        padding:14px 24px;
                        border-radius:10px;
                        box-sizing:border-box;
                        text-align:center;
                      "
                    >
                      Chat on WhatsApp
                    </a>

                  </td>

                </tr>

              </table>

            </td>

          </tr>

          <!-- ===========================================
               CLIENT FOOTER
          ============================================ -->

          <tr>

            <td
              class="ld-content"
              style="
                padding:28px 32px;
                background:#f8fafc;
                border-top:1px solid #e5e7eb;
              "
            >

              <div
                style="
                  color:#6b7280;
                  font-size:14px;
                  line-height:1.9;
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
                  rel="noopener noreferrer"
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
                  href="tel:${BRAND.phoneRaw}"
                  style="
                    color:#2563eb;
                    text-decoration:none;
                  "
                >
                  ${BRAND.phoneDisplay}
                </a>

              </div>

              <!-- Social Links -->

              <div
                style="
                  margin-top:16px;
                  font-size:14px;
                "
              >

                <a
                  href="${BRAND.instagram}"
                  target="_blank"
                  rel="noopener noreferrer"
                  style="
                    color:#2563eb;
                    text-decoration:none;
                    margin-right:18px;
                    font-weight:700;
                  "
                >
                  Instagram
                </a>

                <a
                  href="${BRAND.whatsapp}"
                  target="_blank"
                  rel="noopener noreferrer"
                  style="
                    color:#16a34a;
                    text-decoration:none;
                    font-weight:700;
                  "
                >
                  WhatsApp
                </a>

              </div>

              <p
                style="
                  margin:18px 0 0;
                  color:#9ca3af;
                  font-size:12px;
                  line-height:1.7;
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

  /* =======================================================
     METHOD CHECK
  ======================================================= */

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

    /* =====================================================
       PARSE REQUEST
    ===================================================== */

    const {
      name,
      email,
      phone,
      service,
      message,
    } = JSON.parse(event.body || "{}");

    /* =====================================================
       REQUIRED FIELDS
    ===================================================== */

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
          error:
            "Please fill all required fields.",
        }),
      };
    }

    /* =====================================================
       ENVIRONMENT VARIABLES
    ===================================================== */

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

    /* =====================================================
       NODEMAILER
    ===================================================== */

    const transporter =
      nodemailer.createTransport({
        service: "gmail",

        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_APP_PASSWORD,
        },
      });

    /* =====================================================
       CLEAN SUBJECT DATA
    ===================================================== */

    const safeName =
      cleanSubject(name).slice(0, 80);

    const safeService =
      cleanSubject(service).slice(0, 100);

    /* =====================================================
       ADMIN EMAIL
    ===================================================== */

    await transporter.sendMail({

      from:
        `"Limitless Design Website" <${process.env.GMAIL_USER}>`,

      to:
        process.env.GMAIL_USER,

      replyTo:
        email,

      subject:
        `New ${safeService} Requirement from ${safeName}`,

      html:
        adminMailTemplate({
          name,
          email,
          phone,
          service,
          message,
        }),
    });

    /* =====================================================
       CLIENT EMAIL
    ===================================================== */

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

    /* =====================================================
       SUCCESS RESPONSE
    ===================================================== */

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

    /* =====================================================
       ERROR
    ===================================================== */

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