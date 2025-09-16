import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import Comment from "../models/comment.js";
import Post from "../models/post.js";
import CommentLike from "../models/commentLike.js";

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

    // Add like status for the creating user
    const commentWithLikeStatus = {
      ...populatedComment,
      likeCount: 0,
      liked: false
    };

    res.status(201).json({
      message: "Comment successfully created",
      comment: commentWithLikeStatus
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

    // Add like status for each comment
    const commentsWithLikeStatus = await Promise.all(comments.map(async (comment) => {
      let liked = false;
      
      // Only check like status if user is authenticated
      if (req.user?._id) {
        const existingLike = await CommentLike.findOne({ 
          userId: req.user._id, 
          commentId: comment._id 
        });
        liked = !!existingLike;
      }

      return {
        ...comment,
        likeCount: comment.likeCount || 0,
        liked
      };
    }));

    res.status(200).json({ comments: commentsWithLikeStatus });
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

    // Delete related comment likes
    await CommentLike.deleteMany({ commentId: id });
    
    // Delete the comment
    await Comment.findByIdAndDelete(id);

    res.status(200).json({ message: "Comment successfully deleted" });
  } catch (error) {
    next(error);
  }
};