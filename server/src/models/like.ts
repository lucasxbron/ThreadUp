import mongoose, { Schema, model } from "mongoose";

const likeSchema = new Schema(
  {
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Post",
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
likeSchema.index({ postId: 1, userId: 1 }, { unique: true });

likeSchema.statics.getLikesWithUsers = async function (postId: string) {
  return this.find({ postId })
    .populate("userId", "firstName lastName username")
    .sort({ createdAt: -1 });
};

const Like = model("Like", likeSchema);
export default Like;
