import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { listRows } from "../services/database.js";
import { ok } from "../utils/api.js";

export const clientRouter = Router();
clientRouter.use(requireAuth);

clientRouter.get("/dashboard", async (req, res, next) => {
  try {
    const [projects, invoices, payments] = await Promise.all([
      listRows("projects", { filters: { client_id: req.user.id }, limit: 100 }),
      listRows("invoices", { filters: { client_id: req.user.id }, limit: 100 }),
      listRows("payments", { filters: { client_id: req.user.id }, limit: 100 }),
    ]);
    ok(res, { projects, invoices, payments });
  } catch (e) { next(e); }
});

for (const [path, table] of [["/projects", "projects"], ["/invoices", "invoices"], ["/payments", "payments"]]) {
  clientRouter.get(path, async (req, res, next) => {
    try { ok(res, await listRows(table, { filters: { client_id: req.user.id }, limit: 100 })); } catch (e) { next(e); }
  });
}
