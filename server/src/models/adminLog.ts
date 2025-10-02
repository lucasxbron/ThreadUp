import mongoose, { Schema, model } from "mongoose";

const adminLogSchema = new Schema({
  adminId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  action: {
    type: String,
    required: true,
    enum: ['DELETE_POST', 'DELETE_COMMENT', 'MODERATE_CONTENT']
  },
  targetType: {
    type: String,
    required: true,
    enum: ['POST', 'COMMENT']
  },
  targetId: {
    type: String,
    required: true,
  },
  targetAuthorId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  details: {
    postText: String,
    commentText: String,
    imageUrl: String,
  },
  ipAddress: String,
  userAgent: String,
}, {
  timestamps: true,
});

const AdminLog = model("AdminLog", adminLogSchema);
export default AdminLog;