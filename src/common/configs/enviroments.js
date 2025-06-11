import dot from "dotenv";
dot.config({}); // Load environment variables from .env file
export const { POST, HOST, DB_URL, SECRET_KEY, API_KEY } = process.env;
