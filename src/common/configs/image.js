import { v2 as cloudinary } from "cloudinary";
import { API_KEY, SECRET_KEY } from "./enviroments.js";

// Configuration
cloudinary.config({
  cloud_name: "dnzibcbao",
  api_key: API_KEY,
  api_secret: SECRET_KEY,
});

export default cloudinary;
