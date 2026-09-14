import { supabase } from "../config/supabase.js";

export async function createContact(data) {
  if (!supabase) throw new Error("Database is not configured.");

  const { data: contact, error } = await supabase
    .from("contacts")
    .insert({
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      service: data.service,
      message: data.message,
      status: "NEW",
    })
    .select("id, name, email, phone, service, status, created_at")
    .single();

  if (error) throw new Error(`Unable to save contact enquiry: ${error.message}`);
  return contact;
}
