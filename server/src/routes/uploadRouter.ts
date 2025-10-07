import { Router } from "express";
import { upload } from "../middleware/multer.js";
import { verifyToken } from "../middleware/verifyToken.js";
import * as uploadController from "../controllers/uploadController.js";

const router = Router();

// General upload endpoint (with type specification)
router.post(
  "/",
  verifyToken,
  upload.single("file"),
  uploadController.uploadSingleFile
);

// Multiple files upload (max 5 files)
router.post(
  "/multiple",
  verifyToken,
  upload.array("files", 5),
  uploadController.uploadMultipleFiles
);

// Specific endpoints for different image types
router.post(
  "/profile",
  verifyToken,
  upload.single("file"),
  uploadController.uploadProfileImage
);
router.post(
  "/post",
  verifyToken,
  upload.single("postImage"),
  uploadController.uploadPostImage
);

export default router;
