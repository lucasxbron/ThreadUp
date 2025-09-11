import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import Comment from "../models/comment.js";
import Post from "../models/post.js";

export const createComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { postId } = req.params;
    const { text } = req.body;

    if (!text || text.trim().length === 0) {
      throw createHttpError(400, "Comment text is required");
    }

    const post = await Post.findById(postId);
    if (!post) {
      throw createHttpError(404, "Post not found");
    }

    const newComment = await Comment.create({
      postId,
      authorId: req.user?._id,
      text: text.trim(),
    });

    const populatedComment = await Comment.findById(newComment._id)
      .populate('authorId', 'firstName lastName username')
      .lean();

    res.status(201).json({
      message: "Comment successfully created",
      comment: populatedComment
    });
  } catch (error) {
    next(error);
  }
};

export const getCommentsByPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { postId } = req.params;

    const post = await Post.findById(postId);
    if (!post) {
      throw createHttpError(404, "Post not found");
    }

    const comments = await Comment.find({ postId })
      .populate('authorId', 'firstName lastName username')
      .sort({ createdAt: 1 })
      .lean();

    res.status(200).json({ comments });
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const comment = await Comment.findById(id);
    if (!comment) {
      throw createHttpError(404, "Comment not found");
    }

    if (comment.authorId.toString() !== req.user?._id?.toString()) {
      throw createHttpError(403, "Not authorized to delete comment");
    }

    await Comment.findByIdAndDelete(id);

    res.status(200).json({ message: "Comment successfully deleted" });
  } catch (error) {
    next(error);
  }
};