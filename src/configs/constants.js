/**
 * 應用程式常數配置
 * 統一管理所有共用的變數和配置
 */

// API 版本
export const API_VERSION = "/api/v1";

// 伺服器配置
export const SERVER_PORT = process.env.PORT || 3000;
export const SOCKET_SERVER_PORT = process.env.SOCKET_PORT || 4000;
export const NODE_ENV = process.env.NODE_ENV || "development";
export const IS_PRODUCTION = NODE_ENV === "production";

// Token 配置
export const TOKEN_SECRET = process.env.TOKEN_SECRET;
export const REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET || TOKEN_SECRET;
export const ACCESS_TOKEN_EXPIRY = "10m";
export const REFRESH_TOKEN_EXPIRY = "7d";

// Cookie 配置
export const COOKIE_CONFIG = {
  httpOnly: true,
  secure: IS_PRODUCTION,
  sameSite: "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 天
};

// 資料庫配置
export const DB_CONFIG = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

// Log 配置
export const LOG_LEVEL = process.env.LOG_LEVEL || "info";
export const LOG_MAX_SIZE = 10485760; // 10MB
export const LOG_MAX_FILES = 5;

// Rate Limit 配置
export const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 分鐘
export const RATE_LIMIT_MAX_REQUESTS = 100;

// CORS 配置
export const CORS_ORIGINS = [
  "http://localhost:3000",
  "http://localhost:3300",
  "https://editor.swagger.io",
];

export const CORS_METHODS = ["GET", "POST", "PUT", "DELETE"];
