import { Router } from "express";
import { z } from "zod";
import { ok } from "../utils/api.js";
import { getRow, listRows } from "../services/database.js";

const idSchema = z.string().uuid();

export function resourceRouter(table, { publicRead = true, publicFilters = {} } = {}) {
  const router = Router();
  const readGuard = publicRead
    ? []
    : [(_req, res) => res.status(403).json({ success: false, message: "Access denied" })];

  router.get("/", ...readGuard, async (req, res, next) => {
    try {
      const limitValue = Number(req.query.limit);
      const offsetValue = Number(req.query.offset);
      const limit = Number.isFinite(limitValue) ? Math.min(Math.max(Math.trunc(limitValue), 1), 100) : 50;
      const offset = Number.isFinite(offsetValue) ? Math.max(Math.trunc(offsetValue), 0) : 0;
      const result = await listRows(table, { filters: { ...publicFilters }, limit, offset });
      return ok(res, result);
    } catch (error) {
      return next(error);
    }
  });

  router.get("/:id", ...readGuard, async (req, res, next) => {
    try {
      const row = await getRow(table, idSchema.parse(req.params.id), "*", publicFilters);
      if (!row) return res.status(404).json({ success: false, message: "Record not found" });
      return ok(res, row);
    } catch (error) {
      return next(error);
    }
  });

  return router;
}
