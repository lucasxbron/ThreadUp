import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import User from "../models/user.js";
import { compare } from "bcrypt-ts";
import validator from "validator";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import { createToken } from "../utils/jwt.js";
import { JwtPayload } from "../types/jwt.js";
import { sendVerificationEmail } from "../utils/resend.js";
import crypto from "crypto";
import mongoose from "mongoose";

const secret = config.JWT_SECRET;

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { firstName, lastName, username, email, password } = req.body;

  try {
    if (!firstName || !lastName || !username || !email || !password) {
      throw createHttpError(
        400,
        "First name, last name, username, email and password are required"
      );
    }

    // Check if email already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      throw createHttpError(409, "This email is already registered");
    }

    // Check if username already exists
    const existingUsername = await User.findOne({
      username: username.toLowerCase(),
    });
    if (existingUsername) {
      throw createHttpError(409, "This username is already taken");
    }

    const verificationToken = crypto.randomBytes(32).toString("hex");

    const newUser = await User.create({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      username: username.trim().toLowerCase(),
      email: email.trim(),
      password,
      verificationToken,
      verified: false,
    });

    await sendVerificationEmail(email, verificationToken);

    res.status(201).json({
      message:
        "User registered successfully! Please check your email to verify your account.",
      user: {
        _id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        username: newUser.username,
        email: newUser.email,
        verified: newUser.verified,
        createdAt: newUser.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const verifyEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.query;

  try {
    if (!token || typeof token !== "string") {
      throw createHttpError(400, "Verification token is required");
    }

    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      throw createHttpError(400, "Invalid or expired verification token");
    }

    if (user.verified) {
      throw createHttpError(400, "Email is already verified");
    }

    user.verified = true;
    user.verificationToken = "";
    await user.save();

    res.status(200).json({
      message: "Email verified successfully! You can now log in.",
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        verified: user.verified,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      throw createHttpError(400, "Email and password are required");
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw createHttpError(401, "Invalid credentials");
    }

    if (!user.verified) {
      throw createHttpError(401, "Please verify your email before logging in");
    }

    const comparePassword = await compare(password, user.password);
    if (!comparePassword) {
      throw createHttpError(401, "Invalid credentials");
    }

    if (!secret) {
      throw new Error("JWT_SECRET not found");
    }

    const payload: JwtPayload = {
      _id: user._id.toString(),
      email: user.email,
      roles: user.roles,
      permissions: user.permissions,
    };

    const token = createToken(payload);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // ✅ 7 days (same as JWT)
    });

    res.status(200).json({
      message: "Successfully logged in",
      token,
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        roles: user.roles,
        permissions: user.permissions,
        verified: user.verified,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        followersCount: user.followersCount || 0,
        followingCount: user.followingCount || 0,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const resendVerification = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;

  try {
    if (!email) {
      throw createHttpError(400, "Email is required");
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw createHttpError(404, "User not found");
    }

    if (user.verified) {
      throw createHttpError(400, "Email is already verified");
    }

    // Generate new verification token
    const verificationToken = crypto.randomBytes(32).toString("hex");
    user.verificationToken = verificationToken;
    await user.save();

    // Send new verification email
    await sendVerificationEmail(email, verificationToken);

    res.status(200).json({
      message: "Verification email sent successfully! Please check your inbox.",
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Successfully logged out" });
  } catch (error) {
    next(error);
  }
};

export const getOwnProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.user?._id).select("-password");
    if (!user) {
      throw createHttpError(404, "User not found");
    }
    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};

export const updateOwnProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { firstName, lastName, username } = req.body;

    const updateData: any = {};

    if (firstName) updateData.firstName = firstName.trim();
    if (lastName) updateData.lastName = lastName.trim();
    if (username) {
      // Check if username is taken by another user
      const existingUser = await User.findOne({
        username: username.toLowerCase(),
        _id: { $ne: req.user?._id },
      });
      if (existingUser) {
        throw createHttpError(409, "Username is already taken");
      }
      updateData.username = username.trim().toLowerCase();
    }

    if (Object.keys(updateData).length === 0) {
      throw createHttpError(400, "No valid fields to update");
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user?._id,
      updateData,
      { new: true }
    ).select("-password");

    res.status(200).json({
      message: "Profile updated",
      user: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      throw createHttpError(400, "Current password and new password are required");
    }

    const user = await User.findById(req.user?._id);
    if (!user) {
      throw createHttpError(404, "User not found");
    }

    // Verify current password
    const isCurrentPasswordValid = await compare(currentPassword, user.password);
    if (!isCurrentPasswordValid) {
      throw createHttpError(400, "Current password is incorrect");
    }

    // Validate new password strength
    if (!validator.isStrongPassword(newPassword, {
      minLength: 8,
      minNumbers: 1,
      minSymbols: 1,
      minUppercase: 1,
      minLowercase: 1,
    })) {
      throw createHttpError(400, "New password must be at least 8 characters with 1 uppercase, 1 lowercase, 1 number, and 1 symbol");
    }

    // Update password (will be hashed by pre-save middleware)
    user.password = newPassword;
    await user.save();

    res.status(200).json({
      message: "Password changed successfully"
    });
  } catch (error) {
    next(error);
  }
};

export const deleteAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { password } = req.body;
    const userId = req.user?._id;

    if (!password) {
      throw createHttpError(400, "Password is required to delete account");
    }

    if (!userId) {
      throw createHttpError(401, "User not authenticated");
    }

    const user = await User.findById(userId);
    if (!user) {
      throw createHttpError(404, "User not found");
    }

    // Verify password before deletion
    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      throw createHttpError(400, "Invalid password");
    }

    // Start a transaction to ensure data consistency
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Import all necessary models
      const Post = (await import("../models/post.js")).default;
      const Comment = (await import("../models/comment.js")).default;
      const Like = (await import("../models/like.js")).default;
      const CommentLike = (await import("../models/commentLike.js")).default;
      const Follow = (await import("../models/follow.js")).default;

      // Get all user's posts to delete associated data
      const userPosts = await Post.find({ authorId: userId }).session(session);
      const postIds = userPosts.map(post => post._id);

      // Delete all comments on user's posts
      await Comment.deleteMany({ postId: { $in: postIds } }).session(session);

      // Delete all likes on user's posts
      await Like.deleteMany({ postId: { $in: postIds } }).session(session);

      // Delete all comment likes on comments from user's posts
      const commentsOnUserPosts = await Comment.find({ postId: { $in: postIds } }).session(session);
      const commentIds = commentsOnUserPosts.map(comment => comment._id);
      await CommentLike.deleteMany({ commentId: { $in: commentIds } }).session(session);

      // Delete all user's comments on other posts
      const userComments = await Comment.find({ authorId: userId }).session(session);
      const userCommentIds = userComments.map(comment => comment._id);
      await CommentLike.deleteMany({ commentId: { $in: userCommentIds } }).session(session);
      await Comment.deleteMany({ authorId: userId }).session(session);

      // Delete all user's likes on posts
      await Like.deleteMany({ userId }).session(session);

      // Delete all user's comment likes
      await CommentLike.deleteMany({ userId }).session(session);

      // Delete all follow relationships
      await Follow.deleteMany({ 
        $or: [
          { followerId: userId },
          { followingId: userId }
        ]
      }).session(session);

      // Update follower/following counts for affected users
      const followersToUpdate = await Follow.find({ followingId: userId }).session(session);
      const followingToUpdate = await Follow.find({ followerId: userId }).session(session);

      // Update follower counts for users who were following the deleted user
      for (const follow of followersToUpdate) {
        await User.findByIdAndUpdate(
          follow.followerId,
          { $inc: { followingCount: -1 } },
          { session }
        );
      }

      // Update following counts for users who the deleted user was following
      for (const follow of followingToUpdate) {
        await User.findByIdAndUpdate(
          follow.followingId,
          { $inc: { followersCount: -1 } },
          { session }
        );
      }

      // Delete all user's posts (including images from Cloudinary)
      const { deleteFromCloudinary } = await import("../utils/cloudinary.js");
      for (const post of userPosts) {
        if (post.imagePublicId) {
          try {
            await deleteFromCloudinary(post.imagePublicId);
          } catch (error) {
            console.warn(`Failed to delete image ${post.imagePublicId}:`, error);
            // Continue with deletion even if image deletion fails
          }
        }
      }
      await Post.deleteMany({ authorId: userId }).session(session);

      // Delete the user account
      await User.findByIdAndDelete(userId).session(session);

      // Commit the transaction
      await session.commitTransaction();

      // Clear the authentication cookie
      res.clearCookie("token");

      res.status(200).json({
        message: "Account and all associated data have been permanently deleted"
      });

    } catch (error) {
      // Rollback the transaction on error
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }

  } catch (error) {
    next(error);
  }
};
