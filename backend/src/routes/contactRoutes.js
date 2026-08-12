import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    const contact = await Contact.create({
      name,
      email,
      message
    });

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      contact
    });

  } catch (error) {
    console.error("Contact error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to save message"
    });
  }
});

export default router;