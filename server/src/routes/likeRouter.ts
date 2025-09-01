import { Router } from "express";
import * as likeController from "../controllers/likeController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = Router();

// Protected routes (authentication required)
router.post("/post/:postId", verifyToken, likeController.toggleLike);
router.get("/post/:postId", verifyToken, likeController.getLikeStatus);

export default router;