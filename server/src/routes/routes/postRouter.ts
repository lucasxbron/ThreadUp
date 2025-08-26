import { Router } from "express";
import * as postController from "../controllers/postController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { upload } from "../middleware/multer.js";

const router = Router();

// Public routes (no authentication needed)
router.get("/", postController.getPosts);
router.get("/:id", postController.getPostById);

// Protected routes (authentication required)
router.post("/", verifyToken, upload.single("image"), postController.createPost);
router.delete("/:id", verifyToken, postController.deletePost);

export default router;