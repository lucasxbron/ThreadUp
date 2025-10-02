import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import Comment from "../models/comment.js";
import Post from "../models/post.js";
import CommentLike from "../models/commentLike.js";
import AdminLog from "../models/adminLog.js";

export const createComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { postId } = req.params;
    const { text, parentCommentId } = req.body;

    if (!text || text.trim().length === 0) {
      throw createHttpError(400, "Comment text is required");
    }

    // Ensure user is authenticated
    if (!req.user?._id) {
      throw createHttpError(401, "Authentication required");
    }

    const post = await Post.findById(postId);
    if (!post) {
      throw createHttpError(404, "Post not found");
    }

    if (parentCommentId) {
      const parentComment = await Comment.findById(parentCommentId);
      if (!parentComment) {
        throw createHttpError(404, "Parent comment not found");
      }
    }

    const newComment = await Comment.create({
      postId,
      authorId: req.user._id,
      text: text.trim(),
      parentCommentId: parentCommentId || null,
    });

    const populatedComment = await Comment.findById(newComment._id)
      .populate("authorId", "firstName lastName username avatarUrl roles")
      .lean();

    const commentWithLikeStatus = {
      ...populatedComment,
      likeCount: 0,
      liked: false,
    };

    res.status(201).json({
      message: "Comment successfully created",
      comment: commentWithLikeStatus,
    });
  } catch (error) {
    next(error);
  }
};

export const getCommentsByPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { postId } = req.params;

    const post = await Post.findById(postId);
    if (!post) {
      throw createHttpError(404, "Post not found");
    }

    const comments = await Comment.find({ postId })
      .populate("authorId", "firstName lastName username avatarUrl roles")
      .sort({ createdAt: 1 })
      .lean();

    const commentsWithLikeStatus = await Promise.all(
      comments.map(async (comment) => {
        let liked = false;

        // This method doesn't require authentication, so we handle optional user
        if (req.user?._id) {
          const existingLike = await CommentLike.findOne({
            userId: req.user._id,
            commentId: comment._id,
          });
          liked = !!existingLike;
        }

        return {
          ...comment,
          likeCount: comment.likeCount || 0,
          liked,
        };
      })
    );

    res.status(200).json({ comments: commentsWithLikeStatus });
  } catch (error) {
    next(error);
  }
};

export const updateComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { text } = req.body;

    if (!text || text.trim().length === 0) {
      throw createHttpError(400, "Comment text is required");
    }

    // Ensure user is authenticated
    if (!req.user?._id) {
      throw createHttpError(401, "Authentication required");
    }

    const comment = await Comment.findById(id);
    if (!comment) {
      throw createHttpError(404, "Comment not found");
    }

    // Check authorization - safe to use req.user._id without optional chaining
    if (comment.authorId.toString() !== req.user._id.toString()) {
      throw createHttpError(403, "Not authorized to edit this comment");
    }

    const updatedComment = await Comment.findByIdAndUpdate(
      id,
      {
        text: text.trim(),
        edited: true,
        editedAt: new Date(),
      },
      { new: true }
    )
      .populate("authorId", "firstName lastName username avatarUrl roles")
      .lean();

    let liked = false;
    // Safe to use req.user._id after authentication check
    const existingLike = await CommentLike.findOne({
      userId: req.user._id,
      commentId: id,
    });
    liked = !!existingLike;

    const commentWithLikeStatus = {
      ...updatedComment,
      liked,
    };

    res.status(200).json({
      message: "Comment updated successfully",
      comment: commentWithLikeStatus,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    // Ensure user is authenticated
    if (!req.user?._id) {
      throw createHttpError(401, "Authentication required");
    }

    const comment = await Comment.findById(id);
    if (!comment) {
      throw createHttpError(404, "Comment not found");
    }

    // Check if the user is the author of the comment OR has admin privileges
    const isAuthor = comment.authorId.toString() === req.user._id.toString();
    const isAdmin = req.user.roles?.includes("ADMIN") || false;

    if (!isAuthor && !isAdmin) {
      throw createHttpError(403, "Not authorized to delete comment");
    }

    // Log admin action
    if (isAdmin && !isAuthor) {
      try {
        await AdminLog.create({
          adminId: req.user._id,
          action: "DELETE_COMMENT",
          targetType: "COMMENT",
          targetId: id,
          targetAuthorId: comment.authorId,
          details: {
            commentText: comment.text,
          },
          ipAddress: req.ip || req.socket?.remoteAddress || "Unknown",
          userAgent: req.get("User-Agent") || "Unknown",
        });

        console.log(
          `🛡️ ADMIN ACTION: User ${req.user._id} deleted comment ${id} by user ${comment.authorId}`
        );
      } catch (logError) {
        console.error("Failed to log admin action:", logError);
        // Continue with deletion even if logging fails
      }
    }

    // Delete related comment likes
    await CommentLike.deleteMany({ commentId: id });

    // Delete the comment
    await Comment.findByIdAndDelete(id);

    res.status(200).json({
      message:
        isAdmin && !isAuthor
          ? "Comment deleted by admin"
          : "Comment successfully deleted",
      deletedByAdmin: isAdmin && !isAuthor,
    });
  } catch (error) {
    next(error);
  }
};
