import nodemailer from "nodemailer";

const sendEmail = async (to, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: `"Auth App" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html
    });

    console.log("📩 Email sent to:", to);
  } catch (err) {
    console.error("❌ Email send error:", err.message);
    throw new Error("Email could not be sent");
  }
};

export default sendEmail;
