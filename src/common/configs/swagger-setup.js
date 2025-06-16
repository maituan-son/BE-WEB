import swaggerAutogen from "swagger-autogen";
import { HOST, PORT } from "./enviroments.js";

swaggerAutogen();

const outputFile = "./src/common/configs/swagger-output.json";
const endpointsFiles = ["./src/routers/index.js"]; // chỉnh sửa theo đường dẫn đến file chứa các endpoint của bạn

const swaggerConfig = {
  info: {
    title: "Backend API Codefarm Ecommerce K01 SonDaiLy",
    description: "API Codefarm By SonDaiLy",
    version: "1.0.0",
  },
  host: `${HOST}:${PORT}`,
  basePath: "/api",
  schemes: ["http", "https"],
  consumes: ["application/json"],
  produces: ["application/json"],

  securityDefinitions: {
    BearerAuth: {
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
    },
  },
};

swaggerAutogen()(outputFile, endpointsFiles, swaggerConfig);
