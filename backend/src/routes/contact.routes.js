import { Router } from "express";
import { submitContactForm } from "../controllers/contact.controller.js";
import { contactRateLimiter } from "../middleware/contactRateLimiter.js";

const router = Router();

router.post("/", contactRateLimiter, submitContactForm);

export default router;
