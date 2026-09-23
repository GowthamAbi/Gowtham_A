import crypto from "node:crypto";
import express from "express";
import Visitor from "../models/Visitor.js";
import { sendOwnerMail } from "../utils/mailer.js";
const router = express.Router();

router.post("/", async (req, res) => {
  const sessionId = String(req.body.sessionId || "").slice(0, 100);
  if (!sessionId) return res.status(400).json({ success: false, message: "Session ID required" });
  const ip = String(req.headers["x-forwarded-for"] || req.socket.remoteAddress || "").split(",")[0];
  const existed = await Visitor.exists({ sessionId });
  await Visitor.findOneAndUpdate(
    { sessionId },
    { $setOnInsert: { sessionId, path: String(req.body.path || "/").slice(0, 300), referrer: String(req.body.referrer || "Direct").slice(0, 500), userAgent: String(req.get("user-agent") || "").slice(0, 500), ipHash: crypto.createHash("sha256").update(ip).digest("hex") } },
    { new: true, upsert: true, setDefaultsOnInsert: true },
  );
  const firstVisit = !existed;
  if (firstVisit) {
    sendOwnerMail({ subject: "New portfolio visitor", text: `Your portfolio was opened.\nReferrer: ${req.body.referrer || "Direct"}\nTime: ${new Date().toLocaleString()}`, html: `<h2>New portfolio visitor</h2><p>Your public portfolio was opened.</p><p><b>Referrer:</b> ${escapeHtml(req.body.referrer || "Direct")}</p><p><b>Time:</b> ${new Date().toLocaleString()}</p>` }).catch(console.error);
  }
  res.status(firstVisit ? 201 : 200).json({ success: true, firstVisit });
});
const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#039;" })[char]);
export default router;
