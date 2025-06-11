import express from "express";
import cors from "cors"; // <== thêm dòng này
import router from "./src/routers/index.js";
import { HOST, POST } from "./src/common/configs/enviroments.js";
import fileUpload from "express-fileupload";
import connectDB from "./src/common/configs/connectdb.js";

const app = express();
connectDB();
// Middleware
app.use(cors()); // <== cho phép mọi domain, hoặc cấu hình chi tiết hơn nếu cần
app.use(express.json());

app.use(
  fileUpload({
    useTempFiles: true,
  })
);

// Routes
app.use("/api", router);

app.listen(POST, HOST, () => {
  console.log(`Server running at http://${HOST}:${POST}/`);
});
