import mongoose from "mongoose";
import { DB_URL, NGROK_AUTH_TOKEN, PORT } from "./enviroments.js";
import { createRequire } from "module";
import { confirmWebhook } from "../../models/order/order.controller.js";

const require = createRequire(import.meta.url);
const ngrok = require("@ngrok/ngrok");

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log("✅ Đã kết nối MongoDB");

    // Khởi động ngrok sau khi kết nối thành công

    const listener = await ngrok.forward({
      addr: PORT,
      authtoken: NGROK_AUTH_TOKEN,
    });
    const urlNgrokWebook = `${listener.url()}/webhook}`;
    confirmWebhook(urlNgrokWebook);
    console.log(`🌐 Public URL: ${listener.url()}`);
  } catch (err) {
    console.error("❌ Lỗi kết nối MongoDB hoặc ngrok:", err.message);
    process.exit(1);
  }
};

export default connectDB;
