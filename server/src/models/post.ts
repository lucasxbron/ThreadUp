import mongoose, { Schema, model } from "mongoose";

const postSchema = new Schema({
  authorId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  text: {
    type: String,
    required: true,
    maxlength: 500,
  },
  imageUrl: {
    type: String,
  },
  likeCount: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

const Post = model("Post", postSchema);
export default Post;