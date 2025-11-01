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
import commentLikeRoutes from "./routes/commentLikeRouter.js";
import followRoutes from "./routes/followRouter.js";
import uploadRoutes from "./routes/uploadRouter.js";
import contactRoutes from "./routes/contactRouter.js";
import adminRoutes from "./routes/adminRouter.js";

// const allowedOrigins = [
//   "https://threadup-client.onrender.com",
//   "http://localhost:3000",
// ];

const app = express();

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, Postman, etc.)
      if (!origin || config.ALLOWED_ORIGINS.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS: " + origin));
      }
    },
    credentials: true,
  })
);

// app.use(
//   cors({
//     origin: ["http://localhost:3000", "http://localhost:3005"],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/comment-likes", commentLikeRoutes);
app.use("/api/follows", followRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/admin", adminRoutes);

app.use(errorHandling);

connect();
app.listen(config.PORT, () =>
  console.log(`Server running on http://localhost:${config.PORT}`)
);
