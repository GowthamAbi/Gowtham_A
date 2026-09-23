import crypto from "node:crypto";
import express from "express";
import jwt from "jsonwebtoken";
import Contact from "../models/Contact.js";
import PortfolioContent from "../models/PortfolioContent.js";
import Visitor from "../models/Visitor.js";
import { requireOwner } from "../middleware/ownerAuth.js";
const router = express.Router();

const safeEqual = (a, b) => {
  const left = Buffer.from(String(a || ""));
  const right = Buffer.from(String(b || ""));
  return left.length === right.length && crypto.timingSafeEqual(left, right);
};
router.post("/login", (req, res) => {
  const emailOk = safeEqual(String(req.body.email || "").toLowerCase(), String(process.env.ADMIN_EMAIL || "").toLowerCase());
  const passwordOk = safeEqual(req.body.password, process.env.ADMIN_PASSWORD);
  if (!emailOk || !passwordOk) return res.status(401).json({ success: false, message: "Invalid owner credentials" });
  const token = jwt.sign({ role: "owner", email: process.env.ADMIN_EMAIL }, process.env.JWT_SECRET, { expiresIn: "12h" });
  res.json({ success: true, token });
});
router.use(requireOwner);
router.get("/content", async (_req, res) => res.json({ success: true, content: await PortfolioContent.findOne({ key: "main" }).lean() }));
router.put("/content", async (req, res) => {
  const allowed = (({ profile, skills, projects, experience, education }) => ({ profile, skills, projects, experience, education }))(req.body);
  const content = await PortfolioContent.findOneAndUpdate({ key: "main" }, { ...allowed, updatedBy: req.owner.email }, { new: true, upsert: true, runValidators: true });
  res.json({ success: true, content });
});
router.get("/messages", async (_req, res) => res.json({ success: true, messages: await Contact.find().sort({ createdAt: -1 }).limit(200).lean() }));
router.patch("/messages/:id", async (req, res) => res.json({ success: true, message: await Contact.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true }) }));
router.get("/visitors", async (_req, res) => res.json({ success: true, visitors: await Visitor.find().sort({ createdAt: -1 }).limit(500).lean(), total: await Visitor.countDocuments() }));
export default router;
