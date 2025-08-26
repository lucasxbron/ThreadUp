import { Router } from "express";
import * as authController from "../controllers/authController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = Router();

// Public routes
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);

// Protected routes
router.get("/profile", verifyToken, authController.getOwnProfile);
router.put("/profile", verifyToken, authController.updateOwnProfile);

export default router;