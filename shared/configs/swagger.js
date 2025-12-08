import swaggerJSDoc from "swagger-jsdoc";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "API documentation for my Express application",
      contact: {
        name: "API Support",
        email: "support@example.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
      {
        url: "https://localhost:3000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Enter your JWT token in the format **Bearer <token>**",
        },
      },
    },
    tags: [
      {
        name: "Auth",
        description: "用戶註冊與登入相關 API",
      },
      {
        name: "Notes",
        description: "筆記相關 API",
      },
      {
        name: "Files",
        description: "文件上傳與管理相關 API",
      },
    ],
  },
  apis: [
    join(__dirname, "../routes/v1/*.js"),
    join(__dirname, "../routes/v2/*.js"),
  ], // 指定包含 Swagger 註解的路由文件
};

const swaggerDocument = swaggerJSDoc(options);

export default swaggerDocument;
