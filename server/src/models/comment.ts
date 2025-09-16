import mongoose, { Schema, model } from "mongoose";

const commentSchema = new Schema({
  postId: {
    type: Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  authorId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  text: {
    type: String,
    required: true,
    maxlength: 200,
  },
  likeCount: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

const Comment = model("Comment", commentSchema);
export default Comment;