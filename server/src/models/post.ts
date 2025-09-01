import { Schema, model } from "mongoose";

export const postSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
      maxlength: 500,
    },
    authorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    imageUrl: {
      type: String,
      default: null,
    },
    imagePublicId: {
      // Cloudinary management
      type: String,
      default: null,
    },
    likeCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Post = model("Post", postSchema);
export default Post;
