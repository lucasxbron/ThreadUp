import mongoose, { Schema, model } from "mongoose";

const commentLikeSchema = new Schema(
  {
    commentId: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Unique index to prevent duplicate likes
commentLikeSchema.index({ commentId: 1, userId: 1 }, { unique: true });

const CommentLike = model("CommentLike", commentLikeSchema);
export default CommentLike;
