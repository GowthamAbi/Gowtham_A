import mongoose from "mongoose";

const schema = new mongoose.Schema({
  sessionId: { type: String, required: true, trim: true },
  path: { type: String, default: "/" },
  referrer: { type: String, default: "Direct" },
  userAgent: { type: String, default: "" },
  ipHash: { type: String, default: "" },
}, { timestamps: true });
schema.index({ sessionId: 1 }, { unique: true });
schema.index({ createdAt: -1 });
export default mongoose.model("Visitor", schema);
