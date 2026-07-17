import nodemailer from "nodemailer";

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

    await transporter.sendMail({
      from: `"Limitless Design Website" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: `New ${service} Requirement from ${name}`,
      html: `
        <h2>New Project Requirement</h2>

        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Service:</strong> ${service}</p>

        <hr>

        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    });

    await transporter.sendMail({
      from: `"Limitless Design" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "We've received your project requirement",
      html: `
        <h2>Hello ${name},</h2>

        <p>
          Thank you for contacting <strong>Limitless Design</strong>.
        </p>

        <p>
          We have received your project requirement and our team will get back to you within 24 hours.
        </p>

        <hr>

        <p><strong>Service:</strong> ${service}</p>

        <p>${message.replace(/\n/g, "<br>")}</p>

        <br>

        <p>Regards,<br>Limitless Design Team</p>
      `,
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