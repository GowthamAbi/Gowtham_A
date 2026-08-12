import express from "express";
import Contact from "../models/Contact.js";
import nodemailer from "nodemailer";

const router = express.Router();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Save to MongoDB
    const contact = await Contact.create({
      name,
      email,
      message,
    });

    // Send email
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_TO,

      // When you click Reply in Gmail,
      // it will reply directly to the person who contacted you.
      replyTo: email,

      subject: `New Portfolio Message from ${name}`,

      text: `
New message from your portfolio

Name: ${name}
Email: ${email}

Message:
${message}

--------------------------------
Portfolio Contact Form
      `,

      html: `
        <div style="font-family: Arial, sans-serif; max-width: 650px; margin: auto;">

          <div style="
            background: #172238;
            color: white;
            padding: 25px;
            border-radius: 12px 12px 0 0;
          ">
            <h2 style="margin: 0;">
              New Portfolio Message
            </h2>

            <p style="margin-bottom: 0; color: #bae6fd;">
              Someone contacted you through your portfolio.
            </p>
          </div>

          <div style="
            padding: 25px;
            border: 1px solid #e5e7eb;
            border-top: none;
            border-radius: 0 0 12px 12px;
          ">

            <p>
              <strong>Name:</strong><br>
              ${name}
            </p>

            <p>
              <strong>Email:</strong><br>
              ${email}
            </p>

            <p>
              <strong>Message:</strong>
            </p>

            <div style="
              background: #f8fafc;
              padding: 18px;
              border-radius: 10px;
              line-height: 1.6;
            ">
              ${message.replace(/\n/g, "<br>")}
            </div>

            <p style="
              margin-top: 25px;
              color: #64748b;
              font-size: 13px;
            ">
              This message was sent from your portfolio contact form.
            </p>

          </div>

        </div>
      `,
    });

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      contact,
    });

  } catch (error) {
    console.error("Contact error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to send message",
    });
  }
});

export default router;