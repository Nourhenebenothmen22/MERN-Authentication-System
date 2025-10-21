// utils/mailer.js
import nodemailer from "nodemailer";

// Create a Nodemailer transporter instance
const transporter = nodemailer.createTransport({
  host: 'sandbox.smtp.mailtrap.io',
  port: 2525,
  secure: false, // Mailtrap does not use TLS for this sandbox
  auth: {
    user: '42c2640dbbb26a',
    pass: 'd667870a7333e5',
  },
});

// Optional: verify connection
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ SMTP connection error:", error);
  } else {
    console.log("✅ SMTP server is ready to send emails");
  }
});

export default transporter;
