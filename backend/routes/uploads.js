import { Router } from "express";
import multer from "multer";
import { uploadBuffer, deleteAsset } from "../services/cloudinaryService.js";
import { insertRow, deleteRow, getRow } from "../services/database.js";
import { env } from "../config/env.js";
import { ok, created } from "../utils/api.js";
import { requireAuth, requireRoles } from "../middleware/auth.js";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: env.MAX_UPLOAD_MB * 1024 * 1024, files: 1 },
});

const allowedMimeTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/gif", "application/pdf"]);

export const uploadRouter = Router();
uploadRouter.use(requireAuth, requireRoles("SUPER_ADMIN", "ADMIN", "STAFF"));

uploadRouter.post("/", upload.single("file"), async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: "File is required" });
    if (!allowedMimeTypes.has(req.file.mimetype)) {
      return res.status(400).json({ success: false, message: "Unsupported file type" });
    }

    const folderName = String(req.body.folder || "uploads").replace(/[^a-zA-Z0-9/_-]/g, "").slice(0, 80) || "uploads";
    const result = await uploadBuffer(req.file.buffer, { folder: `${env.CLOUDINARY_FOLDER}/${folderName}` });
    const asset = await insertRow("media_assets", {
      owner_id: req.user.id,
      public_id: result.public_id,
      url: result.secure_url,
      resource_type: result.resource_type,
      folder: result.folder || `${env.CLOUDINARY_FOLDER}/${folderName}`,
      bytes: result.bytes,
      format: result.format,
    });

    return created(res, asset, "File uploaded");
  } catch (e) { next(e); }
});

uploadRouter.delete("/:id", async (req, res, next) => {
  try {
    const asset = await getRow("media_assets", req.params.id, "id,public_id,resource_type,owner_id");
    if (!asset) return res.status(404).json({ success: false, message: "Asset not found" });
    await deleteAsset(asset.public_id, asset.resource_type);
    await deleteRow("media_assets", asset.id);
    return ok(res, null, "File deleted");
  } catch (e) { next(e); }
});
