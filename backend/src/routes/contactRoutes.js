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

// Check email configuration when server starts
transporter.verify((error) => {
  if (error) {
    console.error("❌ Email configuration error:");
    console.error(error);
  } else {
    console.log("✅ Email server is ready");
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    console.log("📩 Contact request received:", {
      name,
      email,
    });

    // -----------------------------
    // Validate
    // -----------------------------

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // -----------------------------
    // Save to MongoDB
    // -----------------------------

    let contact;

    try {
      contact = await Contact.create({
        name,
        email,
        message,
      });

      console.log("✅ Contact saved to MongoDB");
    } catch (dbError) {
      console.error("❌ MongoDB error:");
      console.error(dbError);

      return res.status(500).json({
        success: false,
        message: "Failed to save contact",
      });
    }

    // -----------------------------
    // Send email
    // -----------------------------

    try {
      await transporter.sendMail({
        from: `"Portfolio Contact" <${process.env.MAIL_USER}>`,
        to: process.env.MAIL_TO,
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
          <div style="
            font-family: Arial, sans-serif;
            max-width: 650px;
            margin: 0 auto;
          ">

            <div style="
              background: #172238;
              color: white;
              padding: 25px;
              border-radius: 12px 12px 0 0;
            ">
              <h2 style="margin: 0;">
                New Portfolio Message
              </h2>

              <p style="
                margin-bottom: 0;
                color: #bae6fd;
              ">
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
                ${escapeHtml(name)}
              </p>

              <p>
                <strong>Email:</strong><br>
                ${escapeHtml(email)}
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
                ${escapeHtml(message).replace(/\n/g, "<br>")}
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

      console.log("✅ Email sent successfully");

    } catch (emailError) {
      console.error("❌ Email sending error:");
      console.error(emailError);

      // Contact is already safely stored in MongoDB.
      return res.status(201).json({
        success: true,
        emailSent: false,
        message:
          "Message saved successfully, but email notification failed.",
        contactId: contact._id,
      });
    }

    // -----------------------------
    // Success
    // -----------------------------

    return res.status(201).json({
      success: true,
      emailSent: true,
      message: "Message sent successfully",
      contactId: contact._id,
    });

  } catch (error) {
    console.error("❌ Contact route error:");
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export default router;