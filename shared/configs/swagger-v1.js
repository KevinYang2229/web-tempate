import swaggerJSDoc from "swagger-jsdoc";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const projectDirName = process.cwd();
const __dirname = join(projectDirName, "shared", "configs");
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

const options = {
  definition: {
    openapi: "3.0.4",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "API documentation for API v1",
    },
    servers: [
      {
        url: "http://localhost:3000/api/v1",
      },
      {
        url: "https://localhost:3000/api/v1",
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
  apis: [join(__dirname, "../routes/v1/*.js")],
};

const swaggerDocument = swaggerJSDoc(options);

export default swaggerDocument;
