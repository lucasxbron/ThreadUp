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
      await Like.findByIdAndDelete(existingLike._id);
      await Post.findByIdAndUpdate(postId, { $inc: { likeCount: -1 } });
      
      const updatedPost = await Post.findById(postId);
      
      res.status(200).json({ 
        message: "Like removed", 
        liked: false,
        likeCount: updatedPost?.likeCount || 0
      });
    } else {
      await Like.create({ postId, userId });
      await Post.findByIdAndUpdate(postId, { $inc: { likeCount: 1 } });
      
      const updatedPost = await Post.findById(postId);
      
      res.status(200).json({ 
        message: "Liked", 
        liked: true,
        likeCount: updatedPost?.likeCount || 0
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

    const like = userId ? await Like.findOne({ postId, userId }) : null;
    const post = await Post.findById(postId, 'likeCount');

    if (!post) {
      throw createHttpError(404, "Post not found");
    }

    res.status(200).json({ 
      liked: !!like,
      likeCount: post.likeCount
    });
  } catch (error) {
    next(error);
  }
};