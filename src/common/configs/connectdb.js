import mongoose from "mongoose";
import { DB_URL } from "./enviroments.js";

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Đã kết nối MongoDB");
  } catch (err) {
    console.error("❌ Lỗi kết nối:", err.message);
    process.exit(1); // Thoát nếu không kết nối được
  }
};

export default connectDB;
