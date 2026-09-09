import { Router } from "express";
import multer from "multer";
import { requireAuth, requireRoles } from "../middleware/auth.js";
import { uploadBuffer, deleteAsset } from "../services/cloudinaryService.js";
import { ok } from "../utils/api.js";

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024, files: 1 } });
export const uploadRouter = Router();

uploadRouter.post("/", requireAuth, requireRoles("SUPER_ADMIN", "ADMIN", "STAFF"), upload.single("file"), async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: "File is required" });
    const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif", "application/pdf"];
    if (!allowed.includes(req.file.mimetype)) return res.status(400).json({ success: false, message: "Unsupported file type" });
    const result = await uploadBuffer(req.file.buffer, { folder: `limitless-design/${req.body.folder || "uploads"}` });
    ok(res, { url: result.secure_url, public_id: result.public_id, resource_type: result.resource_type, bytes: result.bytes, format: result.format }, "File uploaded");
  } catch (e) { next(e); }
});

uploadRouter.delete("/", requireAuth, requireRoles("SUPER_ADMIN", "ADMIN", "STAFF"), async (req, res, next) => {
  try { await deleteAsset(req.body.public_id, req.body.resource_type || "image"); ok(res, null, "File deleted"); } catch (e) { next(e); }
});
