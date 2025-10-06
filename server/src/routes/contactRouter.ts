import { Router } from "express";
import * as contactController from "../controllers/contactController.js";

const router = Router();

// Public route - no authentication required
router.post("/", contactController.submitContactForm);

export default router;
