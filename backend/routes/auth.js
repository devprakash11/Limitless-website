import { Router } from "express";
import { z } from "zod";
import { requireAuth } from "../middleware/auth.js";
import { supabaseAdmin } from "../config/supabase.js";
import { ok } from "../utils/api.js";

const profileSchema = z.object({ full_name: z.string().trim().min(2).max(160).optional(), phone: z.string().trim().max(30).optional(), avatar_url: z.string().url().nullable().optional() }).strict();
export const authRouter = Router();

authRouter.get("/me", requireAuth, (req, res) => ok(res, { user: req.user, profile: req.profile }));

authRouter.patch("/profile", requireAuth, async (req, res, next) => {
  try {
    const payload = profileSchema.parse(req.body);
    const { data, error } = await supabaseAdmin.from("profiles").upsert({ id: req.user.id, ...payload }, { onConflict: "id" }).select().single();
    if (error) throw error;
    ok(res, data, "Profile updated");
  } catch (e) { next(e); }
});
