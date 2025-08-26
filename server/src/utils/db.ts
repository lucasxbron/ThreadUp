import mongoose from "mongoose";
import config from "../config/config.js";

const uri = config.MONGODB_URL;

export const connect = async () => {
  if (!uri) {
    throw new Error("MONGO_URL is not defined");
  }
  try {
    mongoose.connection.on("connected", () => {
      console.log("✅ Connected to MongoDB 🛜");
    });

    await mongoose.connect(uri);
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error;
  }
};
