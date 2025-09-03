import jwt from "jsonwebtoken";
import config from "../config/config.js";
import createHttpError from "http-errors";
import { JwtPayload } from "../types/jwt.js";

const secret = config.JWT_SECRET;

export function createToken(payload: JwtPayload): string {
  try {
    if (!secret) {
      throw createHttpError(500, "JWT was not set");
    }
    
    const token = jwt.sign(payload, secret, { expiresIn: "24h" });
    return token;
  } catch (error) {
    throw createHttpError(500, "Token could not be created");
  }
}

export function verifyJWT(token: string): JwtPayload {
  try {
    if (!secret) {
      throw createHttpError(500, "JWT_SECRET not set");
    }
    
    const payload = jwt.verify(token, secret) as JwtPayload;
    return payload;
  } catch (error) {
    throw createHttpError(401, "Token invalid");
  }
}