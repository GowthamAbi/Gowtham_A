import mongoose from "mongoose";

const schema = new mongoose.Schema({
  key: { type: String, default: "main", unique: true },
  profile: { type: mongoose.Schema.Types.Mixed, default: {} },
  skills: { type: [mongoose.Schema.Types.Mixed], default: [] },
  projects: { type: [mongoose.Schema.Types.Mixed], default: [] },
  experience: { type: [mongoose.Schema.Types.Mixed], default: [] },
  education: { type: mongoose.Schema.Types.Mixed, default: {} },
  updatedBy: { type: String, default: "Owner" },
}, { timestamps: true });

export default mongoose.model("PortfolioContent", schema);
