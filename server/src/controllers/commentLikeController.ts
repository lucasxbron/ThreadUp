import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import CommentLike from "../models/commentLike.js";
import Comment from "../models/comment.js";

export const toggleCommentLike = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { commentId } = req.params;
    const userId = req.user?._id;

    if (!userId) {
      throw createHttpError(401, "User not authenticated");
    }

    const comment = await Comment.findById(commentId);
    if (!comment) {
      throw createHttpError(404, "Comment not found");
    }

    const existingLike = await CommentLike.findOne({ commentId, userId });

    if (existingLike) {
      // Unlike: Remove the like
      await CommentLike.findByIdAndDelete(existingLike._id);
      await Comment.findByIdAndUpdate(commentId, { $inc: { likeCount: -1 } });
      
      const updatedComment = await Comment.findById(commentId);
      
      res.status(200).json({ 
        message: "Comment like removed", 
        liked: false,
        likeCount: updatedComment?.likeCount || 0,
        unlikedAt: new Date().toISOString()
      });
    } else {
      // Like: Add a new like
      const newLike = await CommentLike.create({ commentId, userId });
      await Comment.findByIdAndUpdate(commentId, { $inc: { likeCount: 1 } });
      
      const updatedComment = await Comment.findById(commentId);
      
      res.status(200).json({ 
        message: "Comment liked", 
        liked: true,
        likeCount: updatedComment?.likeCount || 0,
        likedAt: newLike.createdAt
      });
    }
  } catch (error) {
    next(error);
  }
};

export const getCommentLikeStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { commentId } = req.params;
    const userId = req.user?._id;

    // Only check like status if user is authenticated
    let liked = false;
    let likedAt = null;
    
    if (userId) {
      const like = await CommentLike.findOne({ commentId, userId });
      liked = !!like;
      likedAt = like?.createdAt || null;
    }

    const comment = await Comment.findById(commentId, 'likeCount');

    if (!comment) {
      throw createHttpError(404, "Comment not found");
    }

    res.status(200).json({ 
      liked,
      likeCount: comment.likeCount || 0,
      likedAt
    });
  } catch (error) {
    next(error);
  }
};

// Get users who liked a comment
export const getCommentLikers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { commentId } = req.params;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      throw createHttpError(404, "Comment not found");
    }

    const likes = await CommentLike.find({ commentId })
      .populate('userId', 'firstName lastName username')
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({
      likers: likes.map(like => ({
        user: like.userId,
        likedAt: like.createdAt
      })),
      totalLikes: likes.length
    });
  } catch (error) {
    next(error);
  }
};