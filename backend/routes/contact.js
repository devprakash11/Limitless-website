import { Router } from "express";
import { z } from "zod";
import { insertRow } from "../services/database.js";
import { sendProjectRequirementEmails } from "../services/emailService.js";
import { created } from "../utils/api.js";

const schema = z.object({
  name: z.string().trim().min(2).max(160),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().max(30).optional().default(""),
  service: z.string().trim().min(2).max(160),
  message: z.string().trim().min(10).max(10000),
  website: z.string().max(200).optional().default(""),
});

export const contactRouter = Router();
contactRouter.post("/", async (req, res, next) => {
  try {
    const data = schema.parse(req.body);
    if (data.website) return created(res, null, "Thank you");
    const contact = await insertRow("contact_enquiries", { name: data.name, email: data.email, phone: data.phone, service: data.service, message: data.message, status: "NEW" });
    await sendProjectRequirementEmails(data);
    created(res, { id: contact.id }, "Your enquiry has been received");
  } catch (e) { next(e); }
});
