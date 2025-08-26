import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import config from "../config/config.js";
import jwt from "jsonwebtoken";
import { JwtPayload } from "../types/jwt.js";
import User from "../models/user.js";

const secret = config.JWT_SECRET;

export async function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    let token = req.cookies?.token;
    
    if (!token) {
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
      }
    }

    if (!secret) {
      throw new Error("JWT_SECRET not found");
    }

    if (!token) {
      throw createHttpError(401, "Token missing");
    }

    const payload = jwt.verify(token, secret) as JwtPayload;

    const user = await User.findById(payload._id).select("-password");
    if (!user) {
      throw createHttpError(401, "User not found");
    }

    req.user = {
      _id: user._id.toString(),
      email: user.email,
      roles: user.roles,
      permissions: user.permissions,
    };

    return next();
  } catch (error) {
    // Handle different error types properly
    if (error instanceof jwt.TokenExpiredError) {
      return next(createHttpError(401, "Token expired"));
    }
    if (error instanceof jwt.JsonWebTokenError) {
      return next(createHttpError(401, "Token invalid"));
    }
    
    if (error instanceof Error && error.name === 'UnauthorizedError') {
      return next(error);
    }
    
    return next(createHttpError(401, "Token invalid"));
  }
}