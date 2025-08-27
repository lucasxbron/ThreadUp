import { v2 as cloudinary } from 'cloudinary';
import config from '../config/config.js';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';

cloudinary.config({
  cloud_name: config.CLOUDINARY_CLOUD_NAME,
  api_key: config.CLOUDINARY_API_KEY,
  api_secret: config.CLOUDINARY_API_SECRET,
});

export interface CloudinaryUploadResult {
  public_id: string;
  secure_url: string;
  original_filename: string;
  bytes: number;
  format: string;
}

export const uploadToCloudinary = async (
  filePath: string,
  folder: string = 'uploads',
  filename?: string
): Promise<CloudinaryUploadResult> => {
  try {
    const publicId = filename || uuidv4();
    
    const result = await cloudinary.uploader.upload(filePath, {
      folder: `threadup/${folder}`, // Organize by app and folder
      public_id: publicId,
      resource_type: 'auto', // Automatically detect file type
      transformation: [
        { quality: 'auto' }, // Optimize quality
        { fetch_format: 'auto' }, // Optimize format
      ],
    });

    // Clean up local file after upload
    fs.unlinkSync(filePath);

    return {
      public_id: result.public_id,
      secure_url: result.secure_url,
      original_filename: result.original_filename,
      bytes: result.bytes,
      format: result.format,
    };
  } catch (error) {
    // Clean up local file if upload fails
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    
    console.error('Cloudinary upload error:', error);
    throw new Error('Failed to upload file to Cloudinary');
  }
};

export const uploadMultipleToCloudinary = async (
  filePaths: string[],
  folder: string = 'uploads'
): Promise<CloudinaryUploadResult[]> => {
  try {
    const uploadPromises = filePaths.map((filePath, index) => 
      uploadToCloudinary(filePath, folder, `${uuidv4()}-${index}`)
    );
    
    return await Promise.all(uploadPromises);
  } catch (error) {
    console.error('Multiple upload error:', error);
    throw new Error('Failed to upload multiple files');
  }
};

export const deleteFromCloudinary = async (publicId: string): Promise<boolean> => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result.result === 'ok';
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    return false;
  }
};

export { cloudinary };