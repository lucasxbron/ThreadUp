import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import Post from "../models/post.js";
import User from "../models/user.js";
import Comment from "../models/comment.js";
import Like from "../models/like.js";
import Follow from "../models/follow.js";
import config from "../config/config.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";

export const createPost = async (req: Request, res: Response, next: NextFunction) => {
  const { text } = req.body;

  try {
    if (!text) {
      throw createHttpError(400, "Text is required");
    }

    let imageUrl = null;
    let imagePublicId = null;

    if (req.file) {
      const result = await uploadToCloudinary(req.file.path, 'post-images');
      imageUrl = result.secure_url;
      imagePublicId = result.public_id;
    }

    const newPost = await Post.create({
      text,
      authorId: req.user?._id,
      imageUrl,
      imagePublicId,
    });

    const populatedPost = await Post.findById(newPost._id).populate("authorId", "firstName lastName username");

    res.status(201).json({
      message: "Post successfully created",
      post: populatedPost,
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
      .populate("authorId", "firstName lastName username followersCount")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalPosts = await Post.countDocuments();
    const totalPages = Math.ceil(totalPosts / limit);

    // Like status, comment count, and follow status
    const postsWithExtra = await Promise.all(posts.map(async (post) => {
      const commentsCount = await Comment.countDocuments({ postId: post._id });
      
      let liked = false;
      let following = false;
      
      const userId = req.user?._id;
      if (userId) {
        // Check like status
        const existingLike = await Like.findOne({ 
          userId: userId, 
          postId: post._id 
        });
        liked = !!existingLike;

        // Check follow status (only if not the user's own post)
        if (userId !== post.authorId._id.toString()) {
          const existingFollow = await Follow.findOne({
            followerId: userId,
            followingId: post.authorId._id
          });
          following = !!existingFollow;
        }
      }

      return {
        ...post.toObject(),
        commentsCount,
        likeCount: post.likeCount || 0,
        liked,
        following
      };
    }));

    res.status(200).json({
      posts: postsWithExtra,
      pagination: {
        currentPage: page,
        totalPages,
        totalPosts,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getPostById = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id).populate("authorId", "firstName lastName username followersCount");

    if (!post) {
      throw createHttpError(404, "Post not found");
    }

    const commentsCount = await Comment.countDocuments({ postId: post._id });
    
    let liked = false;
    let following = false;
    
    if (req.user?._id) {
      // Check like status
      const existingLike = await Like.findOne({ 
        userId: req.user._id, 
        postId: post._id 
      });
      liked = !!existingLike;

      // Check follow status (only if not the user's own post)
      if (req.user._id !== post.authorId._id.toString()) {
        const existingFollow = await Follow.findOne({
          followerId: req.user._id,
          followingId: post.authorId._id
        });
        following = !!existingFollow;
      }
    }

    res.status(200).json({
      ...post.toObject(),
      commentsCount,
      likeCount: post.likeCount || 0,
      liked,
      following
    });
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);

    if (!post) {
      throw createHttpError(404, "Post not found");
    }

    if (post.authorId.toString() !== req.user?._id) {
      throw createHttpError(403, "Not authorized to delete this post");
    }

    // Delete image from Cloudinary if exists
    if (post.imagePublicId) {
      const { deleteFromCloudinary } = await import("../utils/cloudinary.js");
      await deleteFromCloudinary(post.imagePublicId);
    }

    // Delete related comments and likes
    await Comment.deleteMany({ postId: id });
    await Like.deleteMany({ postId: id });
    
    await Post.findByIdAndDelete(id);

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// Endpoint to get post likes with user details
export const getPostLikes = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);
    if (!post) {
      throw createHttpError(404, "Post not found");
    }

    const likes = await Like.find({ postId: id })
      .populate('userId', 'firstName lastName username')
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({
      likes: likes.map(like => ({
        _id: like._id,
        user: like.userId,
        likedAt: like.createdAt
      })),
      totalLikes: likes.length
    });
  } catch (error) {
    next(error);
  }
};