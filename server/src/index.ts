import express, { Request, Response, NextFunction } from "express";
import { connect } from "./utils/db.js";
import config from "./config/config.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandling } from "./middleware/errorHandling.js";
import authRoutes from "./routes/authRouter.js";
import postRoutes from "./routes/postRouter.js";
import commentRoutes from "./routes/commentRouter.js";
import likeRoutes from "./routes/likeRouter.js";
import uploadRoutes from "./routes/uploadRouter.js";

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

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/upload", uploadRoutes);

app.use(errorHandling);

connect();
app.listen(config.PORT, () =>
  console.log(`Server running on http://localhost:${config.PORT}`)
);