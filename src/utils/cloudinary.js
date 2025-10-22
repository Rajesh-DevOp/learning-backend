import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    console.log("local file path", localFilePath);
    if (!localFilePath) return null;

    // Upload on Cloudinary
    console.log("Cloudinary ENV:", {
      CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
      API_KEY: process.env.CLOUDINARY_API_KEY,
      API_SECRET: process.env.CLOUDINARY_API_SECRET ? "Loaded" : "Missing",
    });
    const uploadResult = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    // File uploaded successfully
    console.log("upload result", uploadResult.url);

    // Remove local file after upload
    fs.unlinkSync(localFilePath);

    // ✅ Return the upload result
    return uploadResult;
  } catch (error) {
    console.error("Cloudinary upload error:", error.message);

    // Remove local file if upload failed
    if (fs.existsSync(localFilePath)) fs.unlinkSync(localFilePath);

    return null;
  }
};

export { uploadOnCloudinary };
