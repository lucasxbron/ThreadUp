import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import { uploadToCloudinary, uploadMultipleToCloudinary } from "../utils/cloudinary.js";

export const uploadSingleFile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.file) {
      throw createHttpError(400, "No file uploaded");
    }

    // Determine folder based on upload type
    const uploadType = req.body.type || 'general'; // 'profile', 'post', or 'general'
    let folder: string;
    
    switch (uploadType) {
      case 'profile':
        folder = 'profile-images';
        break;
      case 'post':
        folder = 'post-images';
        break;
      default:
        folder = 'general';
    }

    const result = await uploadToCloudinary(req.file.path, folder);

    res.status(200).json({
      message: "File uploaded successfully",
      file: {
        public_id: result.public_id,
        url: result.secure_url,
        original_name: result.original_filename,
        size: result.bytes,
        format: result.format,
        folder: folder
      }
    });
  } catch (error) {
    next(error);
  }
};

export const uploadMultipleFiles = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const files = req.files as Express.Multer.File[];
    if (!files || files.length === 0) {
      throw createHttpError(400, "No files uploaded");
    }

    // Determine folder based on upload type
    const uploadType = req.body.type || 'general';
    let folder: string;
    
    switch (uploadType) {
      case 'profile':
        folder = 'profile-images';
        break;
      case 'post':
        folder = 'post-images';
        break;
      default:
        folder = 'general';
    }

    const filePaths = files.map(file => file.path);
    const results = await uploadMultipleToCloudinary(filePaths, folder);

    res.status(200).json({
      message: "Files uploaded successfully",
      files: results.map(result => ({
        public_id: result.public_id,
        url: result.secure_url,
        original_name: result.original_filename,
        size: result.bytes,
        format: result.format,
        folder: folder
      }))
    });
  } catch (error) {
    next(error);
  }
};

export const uploadProfileImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.file) {
      throw createHttpError(400, "No profile image uploaded");
    }

    const result = await uploadToCloudinary(req.file.path, 'profile-images');

    res.status(200).json({
      message: "Profile image uploaded successfully",
      profileImage: {
        public_id: result.public_id,
        url: result.secure_url,
        original_name: result.original_filename,
        size: result.bytes,
        format: result.format
      }
    });
  } catch (error) {
    next(error);
  }
};

export const uploadPostImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.file) {
      throw createHttpError(400, "No post image uploaded");
    }

    const result = await uploadToCloudinary(req.file.path, 'post-images');

    res.status(200).json({
      message: "Post image uploaded successfully",
      postImage: {
        public_id: result.public_id,
        url: result.secure_url,
        original_name: result.original_filename,
        size: result.bytes,
        format: result.format
      }
    });
  } catch (error) {
    next(error);
  }
};