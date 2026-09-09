import { supabaseAdmin } from "../config/supabase.js";

export async function listRows(table, { select = "*", filters = {}, order = "created_at", ascending = false, limit = 100, offset = 0 } = {}) {
  let query = supabaseAdmin.from(table).select(select, { count: "exact" });
  for (const [key, value] of Object.entries(filters)) {
    if (value !== undefined && value !== null && value !== "") query = query.eq(key, value);
  }
  query = query.order(order, { ascending }).range(offset, offset + limit - 1);
  const { data, error, count } = await query;
  if (error) throw error;
  return { data, count, limit, offset };
}

export async function getRow(table, id, select = "*", filters = {}) {
  let query = supabaseAdmin.from(table).select(select).eq("id", id);
  for (const [key, value] of Object.entries(filters)) {
    if (value !== undefined && value !== null && value !== "") query = query.eq(key, value);
  }
  const { data, error } = await query.maybeSingle();
  if (error) throw error;
  return data;
}

export async function insertRow(table, payload) {
  const { data, error } = await supabaseAdmin.from(table).insert(payload).select().single();
  if (error) throw error;
  return data;
}

export async function updateRow(table, id, payload) {
  const { data, error } = await supabaseAdmin.from(table).update(payload).eq("id", id).select().single();
  if (error) throw error;
  return data;
}

export async function deleteRow(table, id) {
  const { error } = await supabaseAdmin.from(table).delete().eq("id", id);
  if (error) throw error;
}
