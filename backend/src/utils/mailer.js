import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: process.env.MAIL_USER, pass: process.env.MAIL_PASS },
});

export async function sendOwnerMail({ subject, text, html }) {
  if (!process.env.MAIL_USER || !process.env.MAIL_PASS || !process.env.MAIL_TO) return false;
  await transporter.sendMail({
    from: `"Gowtham Portfolio" <${process.env.MAIL_USER}>`,
    to: process.env.MAIL_TO,
    subject,
    text,
    html,
  });
  return true;
}
