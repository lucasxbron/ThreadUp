import { Router } from "express";
import * as commentController from "../controllers/commentController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = Router();

// Protected routes (authentication required)
router.post("/post/:postId", verifyToken, commentController.createComment);
router.delete("/:id", verifyToken, commentController.deleteComment);

// Public routes (no authentication needed)
router.get("/post/:postId", commentController.getCommentsByPost);

export default router;