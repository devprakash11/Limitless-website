import { Router } from "express";
import { resourceRouter } from "./resource.js";

export const publicRouter = Router();

publicRouter.use(
  "/services",
  resourceRouter("services", { publicFilters: { active: true } }),
);
publicRouter.use(
  "/projects",
  resourceRouter("projects", { publicFilters: { published: true } }),
);
publicRouter.use(
  "/pricing",
  resourceRouter("pricing_plans", { publicFilters: { active: true } }),
);
publicRouter.use(
  "/testimonials",
  resourceRouter("testimonials", { publicFilters: { published: true } }),
);
