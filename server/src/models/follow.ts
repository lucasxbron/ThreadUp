import mongoose, { Schema, model } from "mongoose";

const followSchema = new Schema(
  {
    followerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    followingId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Unique index to prevent duplicate follows
followSchema.index({ followerId: 1, followingId: 1 }, { unique: true });

// Prevent users from following themselves
followSchema.pre("save", function (next) {
  if (this.followerId.toString() === this.followingId.toString()) {
    const error = new Error("Users cannot follow themselves");
    return next(error);
  }
  next();
});

const Follow = model("Follow", followSchema);
export default Follow;
