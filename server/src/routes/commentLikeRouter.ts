import { Router } from "express";
import * as commentLikeController from "../controllers/commentLikeController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = Router();

// Protected routes (authentication required)
router.post("/comment/:commentId", verifyToken, commentLikeController.toggleCommentLike);
router.get("/comment/:commentId", verifyToken, commentLikeController.getCommentLikeStatus);

// Get users who liked a comment (public route)
router.get("/comment/:commentId/users", commentLikeController.getCommentLikers);

export default router;