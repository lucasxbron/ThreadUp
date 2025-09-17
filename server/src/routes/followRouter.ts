import { Router } from "express";
import * as followController from "../controllers/followController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = Router();

// Optional authentication middleware for public routes
const optionalAuth = async (req: any, res: any, next: any) => {
  try {
    await verifyToken(req, res, next);
  } catch (error) {
    // If authentication fails, continue without user context
    req.user = null;
    next();
  }
};

// Protected routes (authentication required)
router.post("/user/:userId", verifyToken, followController.toggleFollow);
router.get("/suggestions", verifyToken, followController.getSuggestions);

// Public routes with optional authentication for follow status
router.get("/user/:userId/status", optionalAuth, followController.getFollowStatus);
router.get("/user/:userId/followers", followController.getFollowers);
router.get("/user/:userId/following", followController.getFollowing);

export default router;