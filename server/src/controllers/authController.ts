import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import User from "../models/user.js";
import { compare } from "bcrypt-ts";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import { createToken } from "../utils/jwt.js";
import { JwtPayload } from "../types/jwt.js";
import { sendVerificationEmail } from "../utils/resend.js";
import crypto from "crypto";

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
