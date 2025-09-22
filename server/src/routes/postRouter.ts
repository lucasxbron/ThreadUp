import { Router } from "express";
import * as postController from "../controllers/postController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { upload } from "../middleware/multer.js";

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

// Public routes with optional authentication
router.get("/feed", optionalAuth, postController.getFilteredPosts);
router.get("/", optionalAuth, postController.getPosts);
router.get("/:id", optionalAuth, postController.getPostById);
router.get("/user/:userId", optionalAuth, postController.getUserPosts);

// Protected routes
router.post("/", verifyToken, upload.single("image"), postController.createPost);
router.delete("/:id", verifyToken, postController.deletePost);

// Like tracking routes
router.get("/:id/likes", postController.getPostLikes);

export default router;