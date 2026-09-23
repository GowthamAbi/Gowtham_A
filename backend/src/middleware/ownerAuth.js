import jwt from "jsonwebtoken";

export function requireOwner(req, res, next) {
  const token = String(req.get("authorization") || "").replace(/^Bearer\s+/i, "");
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (payload.role !== "owner") throw new Error("Invalid owner role");
    req.owner = payload;
    next();
  } catch {
    res.status(401).json({ success: false, message: "Owner login required" });
  }
}
