import { supabaseAdmin } from "../config/supabase.js";

export async function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return res.status(401).json({ success: false, message: "Authentication required" });

  const { data, error } = await supabaseAdmin.auth.getUser(token);
  if (error || !data?.user) return res.status(401).json({ success: false, message: "Invalid or expired session" });

  const { data: profile, error: profileError } = await supabaseAdmin
    .from("profiles")
    .select("id,full_name,role,avatar_url,phone")
    .eq("id", data.user.id)
    .maybeSingle();

  if (profileError) return next(profileError);
  req.user = data.user;
  req.profile = profile || { id: data.user.id, role: "CLIENT" };
  next();
}

export function requireRoles(...roles) {
  return (req, res, next) => {
    if (!req.profile || !roles.includes(req.profile.role)) {
      return res.status(403).json({ success: false, message: "Insufficient permissions" });
    }
    next();
  };
}
