import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import Follow from "../models/follow.js";
import User from "../models/user.js";
import Post from "../models/post.js";        
import Like from "../models/like.js";          
import Comment from "../models/comment.js";  
import mongoose from "mongoose";             

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

export const getSuggestions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?._id;
    const limit = parseInt(req.query.limit as string) || 5;

    if (!userId) {
      throw createHttpError(401, "User not authenticated");
    }

    // Get users the current user is already following
    const following = await Follow.find({ followerId: userId }).select('followingId');
    const followingIds = following.map(f => f.followingId.toString());
    followingIds.push(userId); // Don't suggest the user themselves

    // Get users who have interacted with current user's posts (liked or commented)
    const currentUserPosts = await Post.find({ authorId: userId }).select('_id');
    const postIds = currentUserPosts.map(p => p._id);

    console.log(`Found ${postIds.length} posts for user ${userId}`);

    // Initialize suggestion candidates
    const suggestionCandidates = new Map();

    // 1. Find users who liked current user's posts
    if (postIds.length > 0) {
      const likersAggregation = await Like.aggregate([
        { $match: { postId: { $in: postIds } } },
        { 
          $group: { 
            _id: '$userId', 
            interactionCount: { $sum: 1 } 
          } 
        },
        { $match: { _id: { $nin: followingIds.map(id => new mongoose.Types.ObjectId(id)) } } },
        { $sort: { interactionCount: -1 } },
        { $limit: limit * 3 } // Get more potential candidates
      ]);

      likersAggregation.forEach(item => {
        const userId = item._id.toString();
        suggestionCandidates.set(userId, (suggestionCandidates.get(userId) || 0) + item.interactionCount);
      });

      console.log(`Found ${likersAggregation.length} users who liked posts`);
    }

    // 2. Find users who commented on current user's posts
    if (postIds.length > 0) {
      const commentersAggregation = await Comment.aggregate([
        { $match: { postId: { $in: postIds } } },
        { 
          $group: { 
            _id: '$authorId', 
            interactionCount: { $sum: 1 } 
          } 
        },
        { $match: { _id: { $nin: followingIds.map(id => new mongoose.Types.ObjectId(id)) } } },
        { $sort: { interactionCount: -1 } },
        { $limit: limit * 3 }
      ]);

      commentersAggregation.forEach(item => {
        const userId = item._id.toString();
        // Weight comments slightly higher than likes
        suggestionCandidates.set(userId, (suggestionCandidates.get(userId) || 0) + (item.interactionCount * 1.5));
      });

      console.log(`Found ${commentersAggregation.length} users who commented on posts`);
    }

    // 3. Find users who are following the current user (but current user isn't following back)
    const followersOfCurrentUser = await Follow.find({ 
      followingId: userId,
      followerId: { $nin: followingIds.map(id => new mongoose.Types.ObjectId(id)) }
    }).select('followerId');

    followersOfCurrentUser.forEach(follow => {
      const followerId = follow.followerId.toString();
      // Give high score to users who follow you but you don't follow back
      suggestionCandidates.set(followerId, (suggestionCandidates.get(followerId) || 0) + 10);
    });

    console.log(`Found ${followersOfCurrentUser.length} users following current user`);

    // Get top candidates by interaction score
    const topCandidateIds = Array.from(suggestionCandidates.keys())
      .sort((a, b) => suggestionCandidates.get(b) - suggestionCandidates.get(a))
      .slice(0, Math.ceil(limit * 0.8)); // 80% from interactions and followers

    // Fill remaining spots with random verified users
    const remainingSlots = limit - topCandidateIds.length;
    let randomUsers = [];
    
    if (remainingSlots > 0) {
      randomUsers = await User.aggregate([
        { 
          $match: { 
            _id: { 
              $nin: [
                ...followingIds.map(id => new mongoose.Types.ObjectId(id)),
                ...topCandidateIds.map(id => new mongoose.Types.ObjectId(id))
              ] 
            },
            verified: true 
          } 
        },
        { $sample: { size: remainingSlots } },
        { $project: { _id: 1 } }
      ]);
    }

    // Combine all suggestion user IDs
    const allSuggestionIds = [
      ...topCandidateIds,
      ...randomUsers.map(u => u._id.toString())
    ];

    console.log(`Total suggestion candidates: ${allSuggestionIds.length}`);

    if (allSuggestionIds.length === 0) {
      // If no suggestions found, get some random verified users
      const fallbackUsers = await User.aggregate([
        { 
          $match: { 
            _id: { $nin: followingIds.map(id => new mongoose.Types.ObjectId(id)) },
            verified: true 
          } 
        },
        { $sample: { size: limit } },
        { $project: { _id: 1 } }
      ]);
      
      allSuggestionIds.push(...fallbackUsers.map(u => u._id.toString()));
    }

    // Get full user details
    const suggestedUsers = await User.find({ 
      _id: { $in: allSuggestionIds.map(id => new mongoose.Types.ObjectId(id)) } 
    }).select('firstName lastName username followersCount followingCount createdAt');

    // Check follow status for each suggestion
    const suggestionsWithFollowStatus = await Promise.all(
      suggestedUsers.map(async (user) => {
        const isFollowing = await Follow.findOne({
          followerId: userId,
          followingId: user._id
        });

        return {
          ...user.toObject(),
          interactionScore: suggestionCandidates.get(user._id.toString()) || 0,
          isFollowing: !!isFollowing
        };
      })
    );

    // Sort by interaction score (highest first), then by follower count
    const sortedSuggestions = suggestionsWithFollowStatus
      .sort((a, b) => {
        if (b.interactionScore !== a.interactionScore) {
          return b.interactionScore - a.interactionScore;
        }
        return (b.followersCount || 0) - (a.followersCount || 0);
      })
      .slice(0, limit);

    console.log(`Returning ${sortedSuggestions.length} suggestions`);

    res.status(200).json({
      suggestions: sortedSuggestions
    });
  } catch (error) {
    console.error('Error getting suggestions:', error);
    next(error);
  }
};