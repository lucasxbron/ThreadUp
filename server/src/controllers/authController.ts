import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import User from "../models/user.js";
import { compare } from "bcrypt-ts";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import { createToken } from "../utils/jwt.js";
import { JwtPayload } from "../types/jwt.js";

const secret = config.JWT_SECRET;

export const register = async (req: Request, res: Response, next: NextFunction) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      throw createHttpError(400, "Username, email and password are required");
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      throw createHttpError(409, "This email is already registered");
    }

    const newUser = await User.create({
      username,
      email,
      password,
    });

    res.status(201).json({ 
      message: "User successfully registered", 
      user: { 
        _id: newUser._id, 
        username: newUser.username, 
        email: newUser.email 
      }
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      throw createHttpError(400, "Email and password are required");
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw createHttpError(401, "Invalid credentials");
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

    // Set cookie with token
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000, // 15 minutes (same as token expiry)
    });

    res.status(200).json({
      message: "Successfully logged in",
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        roles: user.roles,
        permissions: user.permissions,
      }
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Successfully logged out" });
  } catch (error) {
    next(error);
  }
};

export const getOwnProfile = async (req: Request, res: Response, next: NextFunction) => {
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

export const updateOwnProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username } = req.body;
    
    if (!username) {
      throw createHttpError(400, "Username is required");
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user?._id,
      { username },
      { new: true }
    ).select("-password");

    res.status(200).json({
      message: "Profile updated",
      user: updatedUser
    });
  } catch (error) {
    next(error);
  }
};