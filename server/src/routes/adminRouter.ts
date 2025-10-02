import { Router } from "express";
import * as adminController from "../controllers/adminController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = Router();

// All admin routes require authentication
router.use(verifyToken);

// Admin log routes
router.get("/logs", adminController.getAdminLogs);
router.get("/stats", adminController.getAdminStats);

export default router;