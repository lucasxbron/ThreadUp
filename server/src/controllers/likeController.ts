import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import Like from "../models/like.js";
import Post from "../models/post.js";

export const toggleLike = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { postId } = req.params;
    const userId = req.user?._id;

    if (!userId) {
      throw createHttpError(401, "User not authenticated");
    }

    const post = await Post.findById(postId);
    if (!post) {
      throw createHttpError(404, "Post not found");
    }

    const existingLike = await Like.findOne({ postId, userId });

    if (existingLike) {
      // Unlike: Remove the like
      await Like.findByIdAndDelete(existingLike._id);
      await Post.findByIdAndUpdate(postId, { $inc: { likeCount: -1 } });
      
      const updatedPost = await Post.findById(postId);
      
      res.status(200).json({ 
        message: "Like removed", 
        liked: false,
        likeCount: updatedPost?.likeCount || 0,
        unlikedAt: new Date().toISOString()
      });
    } else {
      // Like: Add a new like
      const newLike = await Like.create({ postId, userId });
      await Post.findByIdAndUpdate(postId, { $inc: { likeCount: 1 } });
      
      const updatedPost = await Post.findById(postId);
      
      res.status(200).json({ 
        message: "Liked", 
        liked: true,
        likeCount: updatedPost?.likeCount || 0,
        likedAt: newLike.createdAt
      });
    }
  } catch (error) {
    next(error);
  }
};

export const getLikeStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { postId } = req.params;
    const userId = req.user?._id;

    // Only check like status if user is authenticated
    let liked = false;
    let likedAt = null;
    
    if (userId) {
      const like = await Like.findOne({ postId, userId });
      liked = !!like;
      likedAt = like?.createdAt || null;
    }

    const post = await Post.findById(postId, 'likeCount');

    if (!post) {
      throw createHttpError(404, "Post not found");
    }

    res.status(200).json({ 
      liked,
      likeCount: post.likeCount,
      likedAt
    });
  } catch (error) {
    next(error);
  }
};

// Endpoint to get all users who liked a post
export const getPostLikers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { postId } = req.params;

    const post = await Post.findById(postId);
    if (!post) {
      throw createHttpError(404, "Post not found");
    }

    const likes = await Like.find({ postId })
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