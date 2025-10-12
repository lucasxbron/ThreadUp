import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import User from "../models/user.js";
import { compare } from "bcrypt-ts";
import validator from "validator";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import { createToken } from "../utils/jwt.js";
import { JwtPayload } from "../types/jwt.js";
import { sendVerificationEmail } from "../utils/emails/emailVerification.js";
import { sendEmailChangeVerification } from "../utils/emails/emailChange.js";
import crypto from "crypto";
import mongoose from "mongoose";
import { sendPasswordResetEmail } from "../utils/emails/passwordReset.js";
import { deleteFromCloudinary } from "../utils/cloudinary.js";

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
      sameSite: "none", // Changed from "strict" to "none"
      secure: true, // Changed from conditional to always true
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days (same as JWT)
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
        avatarUrl: user.avatarUrl,
        avatarPublicId: user.avatarPublicId,
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
    const { firstName, lastName, username, avatarUrl, avatarPublicId } =
      req.body;

    const updateData: any = {};

    if (firstName) updateData.firstName = firstName.trim();
    if (lastName) updateData.lastName = lastName.trim();
    if (username) {
      // Check if username is already taken by another user
      const existingUser = await User.findOne({
        username: username.trim().toLowerCase(),
        _id: { $ne: req.user?._id },
      });

      if (existingUser) {
        throw createHttpError(400, "Username already taken");
      }

      updateData.username = username.trim().toLowerCase();
    }

    // Handle avatar deletion from Cloudinary
    const currentUser = await User.findById(req.user?._id);
    if (!currentUser) {
      throw createHttpError(404, "User not found");
    }

    // If avatarUrl is being set to null/undefined (deletion)
    if (avatarUrl === null || avatarUrl === undefined) {
      // Delete the current avatar from Cloudinary if it exists
      if (currentUser.avatarPublicId) {
        try {
          await deleteFromCloudinary(currentUser.avatarPublicId);
        } catch (error) {
          console.warn("Failed to delete avatar from Cloudinary:", error);
          // Continue with profile update even if Cloudinary deletion fails
        }
      }
      updateData.avatarUrl = null;
      updateData.avatarPublicId = null;
    } else {
      // Handle avatar updates (new avatar uploaded)
      if (avatarUrl !== undefined) {
        // If updating to a new avatar, delete the old one from Cloudinary
        if (
          currentUser.avatarPublicId &&
          avatarPublicId !== currentUser.avatarPublicId
        ) {
          try {
            await deleteFromCloudinary(currentUser.avatarPublicId);
          } catch (error) {
            console.warn("Failed to delete old avatar from Cloudinary:", error);
            // Continue with profile update even if old image deletion fails
          }
        }
        updateData.avatarUrl = avatarUrl;
      }
      if (avatarPublicId !== undefined) {
        updateData.avatarPublicId = avatarPublicId;
      }
    }

    if (Object.keys(updateData).length === 0) {
      throw createHttpError(400, "No valid fields to update");
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user?._id,
      updateData,
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      throw createHttpError(404, "User not found");
    }

    res.status(200).json({
      message: "Profile updated successfully",
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
      throw createHttpError(
        400,
        "Current password and new password are required"
      );
    }

    const user = await User.findById(req.user?._id);
    if (!user) {
      throw createHttpError(404, "User not found");
    }

    // Verify current password
    const isCurrentPasswordValid = await compare(
      currentPassword,
      user.password
    );
    if (!isCurrentPasswordValid) {
      throw createHttpError(400, "Current password is incorrect");
    }

    // Validate new password strength
    if (
      !validator.isStrongPassword(newPassword, {
        minLength: 8,
        minNumbers: 1,
        minSymbols: 1,
        minUppercase: 1,
        minLowercase: 1,
      })
    ) {
      throw createHttpError(
        400,
        "New password must be at least 8 characters with 1 uppercase, 1 lowercase, 1 number, and 1 symbol"
      );
    }

    // Update password (will be hashed by pre-save middleware)
    user.password = newPassword;
    await user.save();

    res.status(200).json({
      message: "Password changed successfully",
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
      const postIds = userPosts.map((post) => post._id);

      // Delete all comments on user's posts
      await Comment.deleteMany({ postId: { $in: postIds } }).session(session);

      // Delete all likes on user's posts
      await Like.deleteMany({ postId: { $in: postIds } }).session(session);

      // Delete all comment likes on comments from user's posts
      const commentsOnUserPosts = await Comment.find({
        postId: { $in: postIds },
      }).session(session);
      const commentIds = commentsOnUserPosts.map((comment) => comment._id);
      await CommentLike.deleteMany({ commentId: { $in: commentIds } }).session(
        session
      );

      // Delete all user's comments on other posts
      const userComments = await Comment.find({ authorId: userId }).session(
        session
      );
      const userCommentIds = userComments.map((comment) => comment._id);
      await CommentLike.deleteMany({
        commentId: { $in: userCommentIds },
      }).session(session);
      await Comment.deleteMany({ authorId: userId }).session(session);

      // Delete all user's likes on posts
      await Like.deleteMany({ userId }).session(session);

      // Delete all user's comment likes
      await CommentLike.deleteMany({ userId }).session(session);

      // Delete all follow relationships
      await Follow.deleteMany({
        $or: [{ followerId: userId }, { followingId: userId }],
      }).session(session);

      // Update follower/following counts for affected users
      const followersToUpdate = await Follow.find({
        followingId: userId,
      }).session(session);
      const followingToUpdate = await Follow.find({
        followerId: userId,
      }).session(session);

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
            console.warn(
              `Failed to delete image ${post.imagePublicId}:`,
              error
            );
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
        message:
          "Account and all associated data have been permanently deleted",
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

export const requestEmailChange = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { newEmail, password } = req.body;
    const userId = req.user?._id;

    if (!newEmail || !password) {
      throw createHttpError(400, "New email and password are required");
    }

    if (!userId) {
      throw createHttpError(401, "User not authenticated");
    }

    // Validate email format
    if (!validator.isEmail(newEmail)) {
      throw createHttpError(400, "Invalid email format");
    }

    const user = await User.findById(userId);
    if (!user) {
      throw createHttpError(404, "User not found");
    }

    // Verify current password
    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      throw createHttpError(400, "Invalid password");
    }

    // Check if new email is same as current
    const normalizedNewEmail =
      validator.normalizeEmail(newEmail, {
        gmail_remove_dots: false,
      }) || newEmail; // Use original if normalization fails

    if (normalizedNewEmail === user.email) {
      throw createHttpError(
        400,
        "New email must be different from current email"
      );
    }

    // Check if new email is already taken by another user
    const existingUser = await User.findOne({
      email: normalizedNewEmail,
      _id: { $ne: userId },
    });
    if (existingUser) {
      throw createHttpError(400, "Email is already taken");
    }

    // Check if new email is already pending for this user
    if (user.pendingEmail === normalizedNewEmail) {
      throw createHttpError(
        400,
        "Email change request already pending for this address"
      );
    }

    // Generate verification token
    const emailChangeToken = crypto.randomBytes(32).toString("hex");
    const tokenExpiry = new Date();
    tokenExpiry.setHours(tokenExpiry.getHours() + 24); // 24 hours

    // Update user with pending email change
    user.pendingEmail = normalizedNewEmail;
    user.emailChangeToken = emailChangeToken;
    user.emailChangeTokenExpiry = tokenExpiry;
    await user.save();

    // Send verification email to new address
    const userName = `${user.firstName} ${user.lastName}`;
    await sendEmailChangeVerification(
      normalizedNewEmail,
      user.email,
      emailChangeToken,
      userName
    );

    res.status(200).json({
      message:
        "Email change verification sent. Please check your new email address to confirm the change.",
    });
  } catch (error) {
    next(error);
  }
};

export const verifyEmailChange = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.query;

    if (!token || typeof token !== "string") {
      throw createHttpError(400, "Invalid verification token");
    }

    const user = await User.findOne({
      emailChangeToken: token,
      emailChangeTokenExpiry: { $gt: new Date() },
    });

    if (!user) {
      throw createHttpError(400, "Invalid or expired verification token");
    }

    if (!user.pendingEmail) {
      throw createHttpError(400, "No pending email change found");
    }

    // Check if the pending email is still available
    const existingUser = await User.findOne({
      email: user.pendingEmail,
      _id: { $ne: user._id },
    });
    if (existingUser) {
      throw createHttpError(400, "Email is no longer available");
    }

    // Update user's email
    user.email = user.pendingEmail;
    user.pendingEmail = undefined;
    user.emailChangeToken = "";
    user.emailChangeTokenExpiry = undefined;
    await user.save();

    res.status(200).json({
      message: "Email address successfully updated",
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
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

export const cancelEmailChange = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      throw createHttpError(401, "User not authenticated");
    }

    const user = await User.findById(userId);
    if (!user) {
      throw createHttpError(404, "User not found");
    }

    if (!user.pendingEmail) {
      throw createHttpError(400, "No pending email change to cancel");
    }

    // Clear pending email change
    user.pendingEmail = undefined;
    user.emailChangeToken = "";
    user.emailChangeTokenExpiry = undefined;
    await user.save();

    res.status(200).json({
      message: "Email change request cancelled successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;

    if (!email) {
      throw createHttpError(400, "Email is required");
    }

    if (!validator.isEmail(email)) {
      throw createHttpError(400, "Invalid email format");
    }

    const user = await User.findOne({ email: email.trim() });
    if (!user) {
      // Don't reveal if email exists or not for security
      return res.status(200).json({
        message:
          "If an account with that email exists, we've sent a password reset link.",
      });
    }

    if (!user.verified) {
      throw createHttpError(
        400,
        "Please verify your email before resetting password"
      );
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const tokenExpiry = new Date();
    tokenExpiry.setHours(tokenExpiry.getHours() + 1); // 1 hour expiry

    // Update user with reset token
    user.passwordResetToken = resetToken;
    user.passwordResetTokenExpiry = tokenExpiry;
    await user.save();

    // Send reset email
    const userName = `${user.firstName} ${user.lastName}`;
    await sendPasswordResetEmail(user.email, resetToken, userName);

    res.status(200).json({
      message:
        "If an account with that email exists, we've sent a password reset link.",
    });
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      throw createHttpError(400, "Reset token and new password are required");
    }

    // Validate new password strength
    if (
      !validator.isStrongPassword(newPassword, {
        minLength: 8,
        minNumbers: 1,
        minSymbols: 1,
        minUppercase: 1,
        minLowercase: 1,
      })
    ) {
      throw createHttpError(
        400,
        "Password must be at least 8 characters with 1 uppercase, 1 lowercase, 1 number, and 1 symbol"
      );
    }

    const user = await User.findOne({
      passwordResetToken: token,
      passwordResetTokenExpiry: { $gt: new Date() },
    });

    if (!user) {
      throw createHttpError(400, "Invalid or expired reset token");
    }

    // Update password (will be hashed by pre-save middleware)
    user.password = newPassword;
    user.passwordResetToken = "";
    user.passwordResetTokenExpiry = undefined;
    await user.save();

    res.status(200).json({
      message:
        "Password has been reset successfully. You can now log in with your new password.",
    });
  } catch (error) {
    next(error);
  }
};
