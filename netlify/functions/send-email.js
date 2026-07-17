const nodemailer = require("nodemailer");

exports.handler = async (event) => {
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

    // Validate required fields
    if (!name || !email || !service || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          success: false,
          error: "Please fill all required fields.",
        }),
      };
    }

    // Create Gmail transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // ============================
    // Email to Limitless Design
    // ============================
    await transporter.sendMail({
      from: `"Limitless Design Website" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: `New ${service} Requirement from ${name}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:650px;margin:auto">
          <h2>📩 New Project Requirement</h2>

          <table style="border-collapse:collapse;width:100%">
            <tr>
              <td style="padding:8px;"><strong>Name</strong></td>
              <td style="padding:8px;">${name}</td>
            </tr>

            <tr>
              <td style="padding:8px;"><strong>Email</strong></td>
              <td style="padding:8px;">${email}</td>
            </tr>

            <tr>
              <td style="padding:8px;"><strong>Phone</strong></td>
              <td style="padding:8px;">${phone || "Not provided"}</td>
            </tr>

            <tr>
              <td style="padding:8px;"><strong>Service</strong></td>
              <td style="padding:8px;">${service}</td>
            </tr>
          </table>

          <h3>Project Details</h3>

          <div style="padding:15px;background:#f5f5f5;border-radius:8px;">
            ${message.replace(/\n/g, "<br>")}
          </div>
        </div>
      `,
    });

    // ============================
    // Auto Reply to Customer
    // ============================
    await transporter.sendMail({
      from: `"Limitless Design" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "We've received your project requirement 🎉",
      html: `
        <div style="font-family:Arial,sans-serif;max-width:650px;margin:auto;line-height:1.7">

          <h2>Hello ${name},</h2>

          <p>
            Thank you for contacting <strong>Limitless Design</strong>.
          </p>

          <p>
            We have successfully received your project requirement.
            Our creative team will review the information and get back
            to you as soon as possible.
          </p>

          <p>
            <strong>Expected response time:</strong> Within 24 hours.
          </p>

          <hr>

          <h3>Your Submission</h3>

          <p><strong>Name:</strong> ${name}</p>

          <p><strong>Email:</strong> ${email}</p>

          <p><strong>Phone:</strong> ${phone || "Not provided"}</p>

          <p><strong>Service:</strong> ${service}</p>

          <p><strong>Project Details:</strong></p>

          <div style="padding:15px;background:#f5f5f5;border-radius:8px;">
            ${message.replace(/\n/g, "<br>")}
          </div>

          <hr>

          <p>
            If you have any additional information or reference files,
            simply reply to this email.
          </p>

          <br>

          <p>
            Regards,<br>
            <strong>Limitless Design Team</strong>
          </p>

        </div>
      `,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
      }),
    };
  } catch (error) {
    console.error("Email Error:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        error: "Unable to send email. Please try again later.",
      }),
    };
  }
};