import { Router } from "express";
import * as authController from "../controllers/authController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { compare } from "bcrypt-ts";
import validator from "validator";

const router = Router();

// Public routes
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.get("/verify-email", authController.verifyEmail);
router.post("/resend-verification", authController.resendVerification);
router.get("/verify-email-change", authController.verifyEmailChange);


// Protected routes
router.get("/profile", verifyToken, authController.getOwnProfile);
router.put("/profile", verifyToken, authController.updateOwnProfile);
router.put("/change-password", verifyToken, authController.changePassword);
router.delete("/delete-account", verifyToken, authController.deleteAccount);
router.post("/request-email-change", verifyToken, authController.requestEmailChange);
router.post("/cancel-email-change", verifyToken, authController.cancelEmailChange);

export default router;