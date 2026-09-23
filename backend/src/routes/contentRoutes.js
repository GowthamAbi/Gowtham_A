import express from "express";
import PortfolioContent from "../models/PortfolioContent.js";
const router = express.Router();

router.get("/", async (_req, res) => {
  const content = await PortfolioContent.findOne({ key: "main" }).lean();
  res.json({ success: true, content });
});

export default router;
