import { Router } from "express";
import { z } from "zod";
import { resourceRouter } from "./resource.js";

const text = (max = 5000) => z.string().trim().min(1).max(max);
const projectSchema = z.object({ title: text(160), slug: text(160).regex(/^[a-z0-9-]+$/), description: text(10000), image_url: z.string().url().optional().nullable(), category: text(100).optional().nullable(), featured: z.boolean().default(false), published: z.boolean().default(true), sort_order: z.number().int().default(0) });
const serviceSchema = z.object({ name: text(160), slug: text(160).regex(/^[a-z0-9-]+$/), description: text(10000), price: z.number().nonnegative().optional().nullable(), image_url: z.string().url().optional().nullable(), active: z.boolean().default(true), sort_order: z.number().int().default(0) });
const pricingSchema = z.object({ name: text(160), description: text(10000).optional().nullable(), price: z.number().nonnegative(), features: z.array(text(500)).default([]), active: z.boolean().default(true), sort_order: z.number().int().default(0) });
const testimonialSchema = z.object({ client_name: text(160), company: text(160).optional().nullable(), content: text(5000), rating: z.number().int().min(1).max(5).default(5), avatar_url: z.string().url().optional().nullable(), published: z.boolean().default(true) });

export const publicRouter = Router();
publicRouter.use("/services", resourceRouter("services", { createSchema: serviceSchema, updateSchema: serviceSchema.partial() }));
publicRouter.use("/projects", resourceRouter("projects", { createSchema: projectSchema, updateSchema: projectSchema.partial() }));
publicRouter.use("/pricing", resourceRouter("pricing_plans", { createSchema: pricingSchema, updateSchema: pricingSchema.partial() }));
publicRouter.use("/testimonials", resourceRouter("testimonials", { createSchema: testimonialSchema, updateSchema: testimonialSchema.partial() }));
