import { Router } from "express";
import { z } from "zod";
import { requireAuth, requireRoles } from "../middleware/auth.js";
import { listRows, updateRow, insertRow, deleteRow } from "../services/database.js";
import { supabaseAdmin } from "../config/supabase.js";
import { ok, created } from "../utils/api.js";

const text = (max) => z.string().trim().min(1).max(max);
const id = z.string().uuid();
const invoiceSchema = z.object({
  client_id: id,
  invoice_number: text(80),
  amount: z.number().nonnegative(),
  status: z.enum(["DRAFT", "SENT", "PAID", "OVERDUE", "CANCELLED"]).default("DRAFT"),
  due_date: z.string().date().optional().nullable(),
  description: text(10000).optional().nullable(),
});
const paymentSchema = z.object({
  invoice_id: id,
  client_id: id,
  amount: z.number().positive(),
  method: text(80),
  reference: text(160).optional().nullable(),
  status: z.enum(["PENDING", "SUCCESS", "FAILED", "REFUNDED"]).default("SUCCESS"),
});

export const adminRouter = Router();
adminRouter.use(requireAuth, requireRoles("SUPER_ADMIN", "ADMIN", "STAFF"));

adminRouter.get("/dashboard", async (req, res, next) => {
  try {
    const tables = ["profiles", "contact_enquiries", "projects", "invoices", "payments"];
    const results = await Promise.all(tables.map((table) => listRows(table, { limit: 1, offset: 0 })));
    ok(res, Object.fromEntries(tables.map((table, index) => [table, results[index].count || 0])));
  } catch (e) { next(e); }
});

adminRouter.get("/profiles", async (req, res, next) => {
  try {
    ok(res, await listRows("profiles", { limit: Math.min(Number(req.query.limit) || 50, 100), offset: Math.max(Number(req.query.offset) || 0, 0) }));
  } catch (e) { next(e); }
});

adminRouter.patch("/profiles/:id/role", async (req, res, next) => {
  try {
    if (req.profile.role !== "SUPER_ADMIN") return res.status(403).json({ success: false, message: "Only SUPER_ADMIN can change roles" });
    const role = z.enum(["SUPER_ADMIN", "ADMIN", "STAFF", "CLIENT"]).parse(req.body.role);
    ok(res, await updateRow("profiles", id.parse(req.params.id), { role }), "Role updated");
  } catch (e) { next(e); }
});

adminRouter.get("/invoices", async (req, res, next) => {
  try { ok(res, await listRows("invoices", { filters: req.query.status ? { status: req.query.status } : {}, limit: 100 })); } catch (e) { next(e); }
});
adminRouter.post("/invoices", async (req, res, next) => {
  try { created(res, await insertRow("invoices", invoiceSchema.parse(req.body))); } catch (e) { next(e); }
});
adminRouter.patch("/invoices/:id", async (req, res, next) => {
  try { ok(res, await updateRow("invoices", id.parse(req.params.id), invoiceSchema.partial().parse(req.body)), "Invoice updated"); } catch (e) { next(e); }
});
adminRouter.delete("/invoices/:id", async (req, res, next) => {
  try { await deleteRow("invoices", id.parse(req.params.id)); ok(res, null, "Invoice deleted"); } catch (e) { next(e); }
});

adminRouter.get("/payments", async (req, res, next) => {
  try { ok(res, await listRows("payments", { filters: req.query.status ? { status: req.query.status } : {}, limit: 100 })); } catch (e) { next(e); }
});
adminRouter.post("/payments", async (req, res, next) => {
  try { created(res, await insertRow("payments", paymentSchema.parse(req.body))); } catch (e) { next(e); }
});
adminRouter.patch("/payments/:id", async (req, res, next) => {
  try { ok(res, await updateRow("payments", id.parse(req.params.id), paymentSchema.partial().parse(req.body)), "Payment updated"); } catch (e) { next(e); }
});

adminRouter.get("/enquiries", async (req, res, next) => {
  try { ok(res, await listRows("contact_enquiries", { filters: req.query.status ? { status: req.query.status } : {}, limit: 100 })); } catch (e) { next(e); }
});
adminRouter.patch("/enquiries/:id", async (req, res, next) => {
  try {
    const status = z.enum(["NEW", "CONTACTED", "IN_PROGRESS", "CONVERTED", "CLOSED"]).parse(req.body.status);
    ok(res, await updateRow("contact_enquiries", id.parse(req.params.id), { status }), "Enquiry updated");
  } catch (e) { next(e); }
});

adminRouter.post("/users/invite", requireRoles("SUPER_ADMIN"), async (req, res, next) => {
  try {
    const input = z.object({ email: z.string().email(), full_name: text(160), role: z.enum(["ADMIN", "STAFF", "CLIENT"]).default("CLIENT") }).parse(req.body);
    const { data, error } = await supabaseAdmin.auth.admin.inviteUserByEmail(input.email, { data: { full_name: input.full_name } });
    if (error) throw error;
    const { data: profile, error: profileError } = await supabaseAdmin.from("profiles").upsert({ id: data.user.id, full_name: input.full_name, role: input.role }, { onConflict: "id" }).select().single();
    if (profileError) throw profileError;
    created(res, { user: data.user, profile }, "Invitation sent");
  } catch (e) { next(e); }
});
