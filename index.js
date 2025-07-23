import express from "express";
import cors from "cors"; // <== thêm dòng này
import router from "./src/routers/index.js";
import { HOST, PORT } from "./src/common/configs/enviroments.js";
import fileUpload from "express-fileupload";
import connectDB from "./src/common/configs/connectdb.js";
import setupSwagger from "./src/common/configs/swagger-config.js";
import { handlPayosWebook } from "./src/models/order/order.controller.js";

const app = express();
connectDB(); // Kết nối đến MongoD

// Webhook route (before JSON middleware to handle raw data)
app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  handlPayosWebook
);

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // chỉ cho phép domain này gọi API
    credentials: true, // cho phép gửi cookie
  })
); // <== cho phép mọi domain, hoặc cấu hình chi tiết hơn nếu cần
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

// Setup Swagger
setupSwagger(app);
// Routes
app.use("/api", router);
app.post("/webhook", handlPayosWebook);

app.listen(PORT, () => {
  console.log(`Server running at http://${HOST}:${PORT}/`);
  console.log(`Swagger Docs available at http://${HOST}:${PORT}/api-docs`);
});
