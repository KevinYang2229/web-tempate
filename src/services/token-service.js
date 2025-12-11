import jwt from 'jsonwebtoken'

import {
  ACCESS_TOKEN_EXPIRY,
  COOKIE_CONFIG,
  REFRESH_TOKEN_EXPIRY,
  REFRESH_TOKEN_SECRET,
  TOKEN_SECRET,
} from '../configs/constants.js'

/**
 * 生成 Access Token
 * @param {Object} payload - Token payload (包含 id, username)
 * @param {string} expiresIn - 過期時間,預設 10 分鐘
 * @returns {string} JWT token
 */
const generateAccessToken = (payload, expiresIn = ACCESS_TOKEN_EXPIRY) => {
  return jwt.sign(payload, TOKEN_SECRET, { expiresIn })
}

/**
 * 生成 Refresh Token
 * @param {Object} payload - Token payload (包含 id, username, tokenVersion)
 * @param {string} expiresIn - 過期時間,預設 7 天
 * @returns {string} JWT refresh token
 */
const generateRefreshToken = (payload, expiresIn = REFRESH_TOKEN_EXPIRY) => {
  return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn })
}

/**
 * 驗證 Refresh Token
 * @param {string} token - Refresh token
 * @returns {Object} 解碼後的 token payload
 * @throws {Error} 當 token 無效時拋出錯誤
 */
const verifyRefreshToken = (token) => {
  return jwt.verify(token, REFRESH_TOKEN_SECRET)
}

/**
 * 設置 Refresh Token Cookie
 * @param {Object} res - Express response object
 * @param {string} refreshToken - Refresh token
 */
const setRefreshTokenCookie = (res, refreshToken) => {
  res.cookie('refreshToken', refreshToken, COOKIE_CONFIG)
}

/**
 * 清除 Refresh Token Cookie
 * @param {Object} res - Express response object
 */
const clearRefreshTokenCookie = (res) => {
  res.clearCookie('refreshToken', {
    httpOnly: COOKIE_CONFIG.httpOnly,
    secure: COOKIE_CONFIG.secure,
    sameSite: COOKIE_CONFIG.sameSite,
  })
}

export {
  clearRefreshTokenCookie,
  generateAccessToken,
  generateRefreshToken,
  setRefreshTokenCookie,
  verifyRefreshToken,
}
