import cloudinary from "../configs/image.js";

async function uploadImage(imagePath) {
  try {
    const result = await cloudinary.uploader.upload(imagePath);
    console.log("Upload successful:", result);
  } catch (error) {
    console.error("Upload failed:", error);
  }
}

const imagePath = process.argv[2];
if (!imagePath) {
  console.error("Please provide an image path or URL as the first argument.");
  process.exit(1);
}

uploadImage(imagePath);
