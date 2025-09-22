import { Router } from "express";
import * as commentController from "../controllers/commentController.js";
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
router.post("/post/:postId", verifyToken, commentController.createComment);
router.put("/:id", verifyToken, commentController.updateComment);
router.delete("/:id", verifyToken, commentController.deleteComment);

// Public routes with optional authentication for like status
router.get("/post/:postId", optionalAuth, commentController.getCommentsByPost);

export default router;