import dot from "dotenv";
dot.config({
  path: ".env", // Load biến môi trường từ file .env.{NODE_ENV}
  debug: true, // Hiển thị thông báo debug
  encoding: "utf8", // Encoding của file .env
  silent: true, // Không hiển thị thông báo lỗi nếu file .env không tồn tại
  defaults: true, // Load các biến môi trường mặc định từ file .env.defaults
  ignoreProcessEnv: true, // Không ghi đè các biến môi trường đã tồn tại trong process.env
  expand: true, // Mở rộng các biến môi trường có giá trị là biến môi trường khác
  assignToProcessEnv: true, // Gán các biến môi trường vào process.env
  overrideProcessEnv: true, // Ghi đè các biến môi trường đã tồn tại trong process.env
}); // Load environment variables from .env file
export const {
  PORT,
  HOST,
  DB_URL,
  SECRET_KEY,
  API_KEY,
  JWT_SECRET_KEY,
  JWT_EXPIRES_IN,
  EMAIL_PASSWORD,
  JWT_SECRET_KEY_FOR_EMAIL,
  JWT_EXPIRES_IN_FOR_EMAIL,
  PAYOS_CLIENT_ID,
  PAYOS_API_KEY,
  PAYOS_CHECKSUM_KEY,
  NGROK_AUTH_TOKEN,
} = process.env;
