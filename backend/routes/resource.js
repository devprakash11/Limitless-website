import { Router } from "express";
import { z } from "zod";
import { requireAuth, requireRoles } from "../middleware/auth.js";
import { created, ok } from "../utils/api.js";
import { deleteRow, getRow, insertRow, listRows, updateRow } from "../services/database.js";

const idSchema = z.string().uuid();

export function resourceRouter(table, { createSchema, updateSchema, adminOnly = true } = {}) {
  const router = Router();
  router.get("/", async (req, res, next) => {
    try {
      const result = await listRows(table, {
        filters: req.query.status ? { status: req.query.status } : {},
        limit: Math.min(Number(req.query.limit) || 50, 100),
        offset: Math.max(Number(req.query.offset) || 0, 0),
      });
      ok(res, result);
    } catch (e) { next(e); }
  });

  router.get("/:id", async (req, res, next) => {
    try {
      const id = idSchema.parse(req.params.id);
      const row = await getRow(table, id);
      if (!row) return res.status(404).json({ success: false, message: "Record not found" });
      ok(res, row);
    } catch (e) { next(e); }
  });

  const guard = adminOnly ? [requireAuth, requireRoles("SUPER_ADMIN", "ADMIN", "STAFF")] : [requireAuth];
  router.post("/", ...guard, async (req, res, next) => {
    try {
      const payload = createSchema ? createSchema.parse(req.body) : req.body;
      const row = await insertRow(table, payload);
      created(res, row);
    } catch (e) { next(e); }
  });

  router.patch("/:id", ...guard, async (req, res, next) => {
    try {
      const id = idSchema.parse(req.params.id);
      const payload = updateSchema ? updateSchema.parse(req.body) : req.body;
      const row = await updateRow(table, id, payload);
      ok(res, row, "Updated successfully");
    } catch (e) { next(e); }
  });

  router.delete("/:id", ...guard, async (req, res, next) => {
    try {
      const id = idSchema.parse(req.params.id);
      await deleteRow(table, id);
      ok(res, null, "Deleted successfully");
    } catch (e) { next(e); }
  });
  return router;
}
