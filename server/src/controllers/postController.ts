import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import Post from "../models/post.js";
import User from "../models/user.js";
import Comment from "../models/comment.js";
import Like from "../models/like.js";
import Follow from "../models/follow.js";
import config from "../config/config.js";
import { deleteFromCloudinary, uploadToCloudinary } from "../utils/cloudinary.js";
import CommentLike from "../models/commentLike.js";

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

    const populatedPost = await Post.findById(newPost._id)
    .populate("authorId", "firstName lastName username avatarUrl roles");

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
      .populate("authorId", "firstName lastName username followersCount avatarUrl roles")
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
    const post = await Post.findById(id)
      .populate("authorId", "firstName lastName username followersCount avatarUrl roles");

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

    // Check if the user is the author of the post OR has admin privileges
    const isAuthor = post.authorId.toString() === req.user?._id;
    const isAdmin = req.user?.roles?.includes("ADMIN");

    if (!isAuthor && !isAdmin) {
      throw createHttpError(403, "Not authorized to delete this post");
    }

    // Delete image from Cloudinary if exists
    if (post.imagePublicId) {
      try {
        await deleteFromCloudinary(post.imagePublicId);
      } catch (cloudinaryError) {
        console.error("Failed to delete image from Cloudinary:", cloudinaryError);
        // Continue with post deletion even if image deletion fails
      }
    }

    // Delete all comment likes for comments on this post
    const postComments = await Comment.find({ postId: id });
    const commentIds = postComments.map(comment => comment._id);
    
    if (commentIds.length > 0) {
      await CommentLike.deleteMany({ commentId: { $in: commentIds } });
    }

    // Delete all comments related to this post
    await Comment.deleteMany({ postId: id });
    
    // Delete all likes for this post
    await Like.deleteMany({ postId: id });
    
    // Delete post
    await Post.findByIdAndDelete(id);

    res.status(200).json({ 
      message: isAdmin && !isAuthor ? "Post deleted by admin" : "Post deleted successfully",
      deletedPostId: id,
      deletedByAdmin: isAdmin && !isAuthor
    });
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

export const getUserPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    const user = await User.findById(userId);
    if (!user) {
      throw createHttpError(404, "User not found");
    }

    const posts = await Post.find({ authorId: userId })
      .populate("authorId", "firstName lastName username followersCount avatarUrl roles")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalPosts = await Post.countDocuments({ authorId: userId });
    const totalPages = Math.ceil(totalPosts / limit);

    // Add like status, comment count, and follow status
    const postsWithExtra = await Promise.all(posts.map(async (post) => {
      const commentsCount = await Comment.countDocuments({ postId: post._id });
      
      let liked = false;
      let following = false;
      
      const currentUserId = req.user?._id;
      if (currentUserId) {
        // Check like status
        const existingLike = await Like.findOne({ 
          userId: currentUserId, 
          postId: post._id 
        });
        liked = !!existingLike;

        // Check follow status (only if not the user's own post)
        if (currentUserId !== post.authorId._id.toString()) {
          const existingFollow = await Follow.findOne({
            followerId: currentUserId,
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
      totalPosts,
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

export const getFilteredPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;
    const filter = req.query.filter as string || 'recent';
    const userId = req.user?._id;

    let posts;
    let totalPosts;

    switch (filter) {
      case 'trending':
        // Get posts sorted by engagement (likes + comments) within the last 7 days
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        
        posts = await Post.aggregate([
          {
            $match: {
              createdAt: { $gte: sevenDaysAgo }
            }
          },
          {
            $lookup: {
              from: 'comments',
              localField: '_id',
              foreignField: 'postId',
              as: 'comments'
            }
          },
          {
            $addFields: {
              engagementScore: {
                $add: [
                  { $ifNull: ['$likeCount', 0] },
                  { $multiply: [{ $size: '$comments' }, 2] } // Comments worth 2x likes
                ]
              }
            }
          },
          {
            $sort: { engagementScore: -1, createdAt: -1 }
          },
          {
            $skip: skip
          },
          {
            $limit: limit
          },
          {
            $lookup: {
              from: 'users',
              localField: 'authorId',
              foreignField: '_id',
              as: 'authorId'
            }
          },
          {
            $unwind: '$authorId'
          },
          {
            $project: {
              'authorId.password': 0,
              'authorId.verificationToken': 0,
              'authorId.__v': 0,
              'comments': 0,
              '__v': 0
            }
          }
        ]);

        totalPosts = await Post.countDocuments({
          createdAt: { $gte: sevenDaysAgo }
        });
        break;

      case 'following':
        if (!userId) {
          return res.status(401).json({ message: "Authentication required for following feed" });
        }

        // Get users that the current user follows
        const following = await Follow.find({ followerId: userId }).select('followingId');
        const followingIds = following.map(f => f.followingId);

        if (followingIds.length === 0) {
          posts = [];
          totalPosts = 0;
        } else {
          posts = await Post.find({ authorId: { $in: followingIds } })
            .populate("authorId", "firstName lastName username followersCount avatarUrl roles")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean();
          totalPosts = await Post.countDocuments({ authorId: { $in: followingIds } });
        }
        break;

      case 'recent':
      default:
        // Default recent posts
        posts = await Post.find()
          .populate("authorId", "firstName lastName username followersCount avatarUrl roles")
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit)
          .lean();

        totalPosts = await Post.countDocuments();
        break;
    }

    const totalPages = Math.ceil(totalPosts / limit);

    // Add like status, comment count, and follow status for each post
    const postsWithExtra = await Promise.all(posts.map(async (post) => {
      const commentsCount = await Comment.countDocuments({ postId: post._id });
      
      let liked = false;
      let following = false;
      
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
        ...post,
        commentsCount,
        likeCount: post.likeCount || 0,
        liked,
        following
      };
    }));

    res.status(200).json({
      posts: postsWithExtra,
      filter,
      pagination: {
        currentPage: page,
        totalPages,
        totalPosts,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      }
    });
  } catch (error) {
    console.error('Error in getFilteredPosts:', error);
    next(error);
  }
};