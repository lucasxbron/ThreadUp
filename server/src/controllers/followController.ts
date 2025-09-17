import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import Follow from "../models/follow.js";
import User from "../models/user.js";

export const toggleFollow = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    const followerId = req.user?._id;

    if (!followerId) {
      throw createHttpError(401, "User not authenticated");
    }

    if (followerId === userId) {
      throw createHttpError(400, "Users cannot follow themselves");
    }

    const userToFollow = await User.findById(userId);
    if (!userToFollow) {
      throw createHttpError(404, "User not found");
    }

    const existingFollow = await Follow.findOne({ 
      followerId, 
      followingId: userId 
    });

    if (existingFollow) {
      // Unfollow: Remove the follow relationship
      await Follow.findByIdAndDelete(existingFollow._id);
      
      // Update follower counts
      await User.findByIdAndUpdate(userId, { $inc: { followersCount: -1 } });
      await User.findByIdAndUpdate(followerId, { $inc: { followingCount: -1 } });
      
      res.status(200).json({ 
        message: "Unfollowed successfully", 
        following: false,
        unfollowedAt: new Date().toISOString()
      });
    } else {
      // Follow: Create new follow relationship
      const newFollow = await Follow.create({ 
        followerId, 
        followingId: userId 
      });
      
      // Update follower counts
      await User.findByIdAndUpdate(userId, { $inc: { followersCount: 1 } });
      await User.findByIdAndUpdate(followerId, { $inc: { followingCount: 1 } });
      
      res.status(200).json({ 
        message: "Followed successfully", 
        following: true,
        followedAt: newFollow.createdAt
      });
    }
  } catch (error) {
    next(error);
  }
};

export const getFollowStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    const followerId = req.user?._id;

    // Only check follow status if user is authenticated
    let following = false;
    let followedAt = null;
    
    if (followerId && followerId !== userId) {
      const follow = await Follow.findOne({ 
        followerId, 
        followingId: userId 
      });
      following = !!follow;
      followedAt = follow?.createdAt || null;
    }

    const user = await User.findById(userId, 'followersCount followingCount');
    if (!user) {
      throw createHttpError(404, "User not found");
    }

    res.status(200).json({ 
      following,
      followersCount: user.followersCount || 0,
      followingCount: user.followingCount || 0,
      followedAt
    });
  } catch (error) {
    next(error);
  }
};

export const getFollowers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    const user = await User.findById(userId);
    if (!user) {
      throw createHttpError(404, "User not found");
    }

    const followers = await Follow.find({ followingId: userId })
      .populate('followerId', 'firstName lastName username followersCount followingCount')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const totalFollowers = await Follow.countDocuments({ followingId: userId });

    res.status(200).json({
      followers: followers.map(follow => ({
        user: follow.followerId,
        followedAt: follow.createdAt
      })),
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalFollowers / limit),
        totalFollowers,
        hasNext: page < Math.ceil(totalFollowers / limit),
        hasPrev: page > 1,
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getFollowing = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    const user = await User.findById(userId);
    if (!user) {
      throw createHttpError(404, "User not found");
    }

    const following = await Follow.find({ followerId: userId })
      .populate('followingId', 'firstName lastName username followersCount followingCount')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const totalFollowing = await Follow.countDocuments({ followerId: userId });

    res.status(200).json({
      following: following.map(follow => ({
        user: follow.followingId,
        followedAt: follow.createdAt
      })),
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalFollowing / limit),
        totalFollowing,
        hasNext: page < Math.ceil(totalFollowing / limit),
        hasPrev: page > 1,
      }
    });
  } catch (error) {
    next(error);
  }
};