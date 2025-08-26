import mongoose, { Schema, model } from "mongoose";

const likeSchema = new Schema({
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
}, {
  timestamps: true,
});

// Unique index to prevent duplicate likes
likeSchema.index({ postId: 1, userId: 1 }, { unique: true });

const Like = model("Like", likeSchema);
export default Like;