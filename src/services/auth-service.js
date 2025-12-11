import bcrypt from "bcrypt";
import {
  createUser,
  getUserByUsername,
  getUserById,
  incrementTokenVersion,
} from "../models/users.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "./token-service.js";

/**
 * 使用者註冊服務
 * @param {string} username - 使用者名稱
 * @param {string} password - 密碼
 * @param {string} email - 電子郵件
 * @returns {Object} 包含 user, accessToken, refreshToken
 * @throws {Error} 當使用者名稱已存在時拋出錯誤
 */
const register = async (username, password, email) => {
  // 檢查使用者是否已存在
  const existingUser = await getUserByUsername(username);
  if (existingUser) {
    const error = new Error("Username already exists");
    error.statusCode = 409;
    throw error;
  }

  // 加密密碼
  const hash = await bcrypt.hash(password, 10);

  // 創建使用者
  const user = await createUser(username, hash, email);

  // 生成 tokens
  const accessToken = generateAccessToken({
    id: user.id,
    username: user.username,
  });

  const refreshToken = generateRefreshToken({
    id: user.id,
    username: user.username,
    tokenVersion: user.token_version || 0,
  });

  return { user, accessToken, refreshToken };
};

/**
 * 使用者登入服務
 * @param {string} username - 使用者名稱
 * @param {string} password - 密碼
 * @returns {Object} 包含 user, accessToken, refreshToken
 * @throws {Error} 當認證失敗時拋出錯誤
 */
const login = async (username, password) => {
  // 查詢使用者
  const user = await getUserByUsername(username);
  if (!user) {
    const error = new Error("Invalid username or password");
    error.statusCode = 401;
    throw error;
  }

  // 驗證密碼
  const passwordMatch = await bcrypt.compare(password, user.password_hash);
  if (!passwordMatch) {
    const error = new Error("Invalid username or password");
    error.statusCode = 401;
    throw error;
  }

  // 生成 tokens
  const accessToken = generateAccessToken({
    id: user.id,
    username: user.username,
  });

  const refreshToken = generateRefreshToken({
    id: user.id,
    username: user.username,
    tokenVersion: user.token_version || 0,
  });

  return { user, accessToken, refreshToken };
};

/**
 * 刷新 Access Token 服務
 * @param {string} oldRefreshToken - 舊的 refresh token
 * @returns {Object} 包含 accessToken, refreshToken
 * @throws {Error} 當 token 無效或已被撤銷時拋出錯誤
 */
const refreshToken = async (oldRefreshToken) => {
  if (!oldRefreshToken) {
    const error = new Error("No refresh token provided");
    error.statusCode = 401;
    throw error;
  }

  // 驗證 refresh token
  const decoded = verifyRefreshToken(oldRefreshToken);

  // 驗證 token version
  const user = await getUserById(decoded.id);
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  const currentTokenVersion = user.token_version || 0;
  const tokenVersion = decoded.tokenVersion || 0;

  if (tokenVersion !== currentTokenVersion) {
    const error = new Error("Refresh token has been revoked");
    error.statusCode = 403;
    throw error;
  }

  // 生成新的 tokens
  const accessToken = generateAccessToken({
    id: decoded.id,
    username: decoded.username,
  });

  const newRefreshToken = generateRefreshToken({
    id: decoded.id,
    username: decoded.username,
    tokenVersion: currentTokenVersion,
  });

  return { accessToken, refreshToken: newRefreshToken };
};

/**
 * 撤銷所有 refresh tokens
 * @param {number} userId - 使用者 ID
 */
const revokeAllTokens = async (userId) => {
  await incrementTokenVersion(userId);
};

export { register, login, refreshToken, revokeAllTokens };
