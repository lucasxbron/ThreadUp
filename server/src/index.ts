import { connect } from "./utils/db.js";
import express, { Request, Response, NextFunction } from "express";
import config from "./config/config.js";
import { errorHandling } from "./middleware/errorHandling.js";
import authRoutes from "./routes/authRouter.js";
import postRoutes from "./routes/postRouter.js";
import commentRoutes from "./routes/commentRouter.js";
import likeRoutes from "./routes/likeRouter.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { upload } from "./middleware/multer.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/uploads", express.static("public/uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);

app.post(
  "/api/upload",
  upload.single("profileImage"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.file) {
        throw new Error("No file uploaded");
      }
      const fileUrl = `http://localhost:${config.PORT}/uploads/${req.file.filename}`;
      res.status(200).json({ message: "Upload successful", url: fileUrl });
    } catch (error) {
      next(error);
    }
  }
);

app.use(errorHandling);

connect();
app.listen(config.PORT, () =>
  console.log(`Server running at http://localhost:${config.PORT}`)
);