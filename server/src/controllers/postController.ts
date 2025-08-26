import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import Post from "../models/post.js";
import User from "../models/user.js";
import Comment from "../models/comment.js";
import Like from "../models/like.js";
import config from "../config/config.js";

export const createPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { text } = req.body;
    
    if (!text || text.trim().length === 0) {
      throw createHttpError(400, "Text is required");
    }

    let imageUrl;
    if (req.file) {
      imageUrl = `http://localhost:${config.PORT}/uploads/${req.file.filename}`;
    }

    const newPost = await Post.create({
      authorId: req.user?._id,
      text: text.trim(),
      imageUrl,
    });

    const populatedPost = await Post.findById(newPost._id)
      .populate('authorId', 'username')
      .lean();

    res.status(201).json({
      message: "Post successfully created",
      post: populatedPost
    });
  } catch (error) {
    next(error);
  }
};

export const getPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    const posts = await Post.find()
      .populate('authorId', 'username')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Post.countDocuments();

    const postsWithExtra = await Promise.all(posts.map(async (post) => {
      const commentsCount = await Comment.countDocuments({ postId: post._id });
      let isLiked = false;
      
      if (req.user?._id) {
        const like = await Like.findOne({ postId: post._id, userId: req.user._id });
        isLiked = !!like;
      }

      return {
        ...post,
        commentsCount,
        isLiked,
      };
    }));

    res.status(200).json({
      posts: postsWithExtra,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalPosts: total,
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1,
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getPostById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id)
      .populate('authorId', 'username')
      .lean();

    if (!post) {
      throw createHttpError(404, "Post not found");
    }

    const commentsCount = await Comment.countDocuments({ postId: post._id });
    let isLiked = false;
    
    if (req.user?._id) {
      const like = await Like.findOne({ postId: post._id, userId: req.user._id });
      isLiked = !!like;
    }

    res.status(200).json({ 
      post: {
        ...post,
        commentsCount,
        isLiked,
      }
    });
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);
    if (!post) {
      throw createHttpError(404, "Post not found");
    }

    if (post.authorId.toString() !== req.user?._id?.toString()) {
      throw createHttpError(403, "Not authorized to delete post");
    }

    await Comment.deleteMany({ postId: id });
    await Like.deleteMany({ postId: id });
    await Post.findByIdAndDelete(id);

    res.status(200).json({ message: "Post successfully deleted" });
  } catch (error) {
    next(error);
  }
};