import { Router } from "express";
import cloudinary from "../common/configs/image.js";

const router = Router();

// Upload image route
router.post("/upload", async (req, res) => {
  try {
    if (!req.files || !req.files.image) {
      return res.status(400).json({ message: "No image file uploaded" });
    }
    const file = req.files.image;
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: "image",
    });
    res.json({
      public_id: result.public_id,
      url: result.secure_url,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Image upload failed", error: error.message });
  }
});

// Remove image route
router.delete("/remove", async (req, res) => {
  try {
    const { public_id } = req.body;
    if (!public_id) {
      return res.status(400).json({ message: "No public_id provided" });
    }
    await cloudinary.uploader.destroy(public_id);
    res.json({ message: "Image removed successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Image removal failed", error: error.message });
  }
});

export default router;
