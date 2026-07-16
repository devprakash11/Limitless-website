import app from "./app.js";
import { env } from "./config/env.js";
import { verifySmtpConnection } from "./config/mailer.js";

const startServer = async () => {
  try {
    await verifySmtpConnection();
    console.log("SMTP connection verified successfully.");

    app.listen(env.port, () => {
      console.log(`Contact API running at http://localhost:${env.port}`);
    });
  } catch (error) {
    console.error("Backend startup failed:", error.message);
    console.error(
      "Check SMTP_USER, SMTP_PASS, SMTP_HOST, SMTP_PORT, and SMTP_SECURE in backend/.env."
    );
    process.exit(1);
  }
};

startServer();
