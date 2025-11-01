import dotenv from "dotenv";
dotenv.config();

interface Config {
  PORT: number;
  MONGODB_URL?: string;
  RESEND_API_KEY: string;
  RESEND_FROM_EMAIL: string;
  FRONTEND_URL?: string;
  JWT_SECRET: string;
  CLOUDINARY_CLOUD_NAME: string;
  CLOUDINARY_API_KEY: string;
  CLOUDINARY_API_SECRET: string;
  ALLOWED_ORIGINS: string[];
}

function getEnvVar(key: string, required: boolean = true): string | undefined {
  const value = process.env[key];
  if (required && !value) {
    throw new Error(`Environment variable ${key} is not set.`);
  }
  return value;
}

const config: Config = {
  PORT: parseInt(process.env.PORT || "3005", 10),
  MONGODB_URL: getEnvVar("MONGODB_URL")!,
  RESEND_API_KEY: getEnvVar("RESEND_API_KEY")!,
  RESEND_FROM_EMAIL:
    process.env.RESEND_FROM_EMAIL || "ThreadUp <noreply@threadup.social>",
  FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:3000",
  JWT_SECRET: getEnvVar("JWT_SECRET")!,
  CLOUDINARY_CLOUD_NAME: getEnvVar("CLOUDINARY_CLOUD_NAME")!,
  CLOUDINARY_API_KEY: getEnvVar("CLOUDINARY_API_KEY")!,
  CLOUDINARY_API_SECRET: getEnvVar("CLOUDINARY_API_SECRET")!,
  ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(",").map((origin) => origin.trim())
    : ["http://localhost:3000"],
};

export default config;
