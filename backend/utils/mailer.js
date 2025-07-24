import nodemailer from "nodemailer";

export const sendResetEmail = async (to, token) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const resetLink = `http://localhost:5173/reset-password?token=${token}`;

  await transporter.sendMail({
    from: `"Betting Test" <${process.env.EMAIL}>`,
    to,
    subject: "Reset your password",
    html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
  });
};
