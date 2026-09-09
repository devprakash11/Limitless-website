import { Router } from "express";
import { z } from "zod";
import { requireAuth, requireRoles } from "../middleware/auth.js";
import { created, ok } from "../utils/api.js";
import { deleteRow, getRow, insertRow, listRows, updateRow } from "../services/database.js";

const idSchema = z.string().uuid();

export function resourceRouter(table, { createSchema, updateSchema, adminOnly = true, publicRead = true, publicFilters = {} } = {}) {
  const router = Router();
  const guard = adminOnly ? [requireAuth, requireRoles("SUPER_ADMIN", "ADMIN", "STAFF")] : [requireAuth];
  const readGuard = publicRead ? [] : guard;

  router.get("/", ...readGuard, async (req, res, next) => {
    try {
      const filters = { ...publicFilters };
      if (req.query.status) filters.status = req.query.status;
      const result = await listRows(table, { filters, limit: Math.min(Number(req.query.limit) || 50, 100), offset: Math.max(Number(req.query.offset) || 0, 0) });
      ok(res, result);
    } catch (e) { next(e); }
  });

  router.get("/:id", ...readGuard, async (req, res, next) => {
    try {
      const row = await getRow(table, idSchema.parse(req.params.id), "*", publicFilters);
      if (!row) return res.status(404).json({ success: false, message: "Record not found" });
      ok(res, row);
    } catch (e) { next(e); }
  });

  router.post("/", ...guard, async (req, res, next) => {
    try { created(res, await insertRow(table, createSchema ? createSchema.parse(req.body) : req.body)); } catch (e) { next(e); }
  });
  router.patch("/:id", ...guard, async (req, res, next) => {
    try { ok(res, await updateRow(table, idSchema.parse(req.params.id), updateSchema ? updateSchema.parse(req.body) : req.body), "Updated successfully"); } catch (e) { next(e); }
  });
  router.delete("/:id", ...guard, async (req, res, next) => {
    try { await deleteRow(table, idSchema.parse(req.params.id)); ok(res, null, "Deleted successfully"); } catch (e) { next(e); }
  });
  return router;
}
