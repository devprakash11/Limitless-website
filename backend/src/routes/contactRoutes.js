import { Router } from "express";
import rateLimit from "express-rate-limit";
import { z } from "zod";
import { createContact } from "../services/contactService.js";
import { sendContactNotification } from "../services/emailService.js";

const router = Router();

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { success: false, message: "Too many submissions. Please try again later." },
});

const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters.").max(100),
  email: z.string().trim().email("Please enter a valid email address.").max(254),
  phone: z.string().trim().max(25).optional().or(z.literal("")),
  service: z.string().trim().min(1, "Please select a service.").max(100),
  message: z.string().trim().min(20, "Message must be at least 20 characters.").max(5000),
  website: z.string().trim().max(200).optional().or(z.literal("")),
});

router.post("/", contactLimiter, async (req, res, next) => {
  try {
    const parsed = contactSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: "Please correct the form and try again.",
        errors: parsed.error.flatten().fieldErrors,
      });
    }

    const data = parsed.data;
    if (data.website) {
      return res.status(200).json({ success: true, message: "Requirement submitted successfully." });
    }

    const contact = await createContact(data);

    try {
      await sendContactNotification(contactWithMessage(contact, data.message));
    } catch (emailError) {
      console.error("[contact] email notification failed:", emailError.message);
    }

    return res.status(201).json({
      success: true,
      message: "Requirement submitted successfully.",
      contactId: contact.id,
    });
  } catch (error) {
    next(error);
  }
});

function contactWithMessage(contact, message) {
  return { ...contact, message };
}

export default router;
