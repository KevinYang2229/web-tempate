import {
  register,
  login,
  refreshToken,
  revokeAllTokens,
} from "../services/auth-service.js";
import {
  setRefreshTokenCookie,
  clearRefreshTokenCookie,
} from "../services/token-service.js";

const registerUser = async (req, res, next) => {
  const { username, password, email } = req.body;
  console.log("Auth attempt:", { username, password, email });

  try {
    const { user, accessToken, refreshToken } = await register(
      username,
      password,
      email,
    );

    // 設置 refresh token 到 httpOnly cookie
    setRefreshTokenCookie(res, refreshToken);

    res.status(201).json({
      message: "User registered successfully",
      username: user.username,
      token: accessToken,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    return next(error);
  }
};

const loginUser = async (req, res, next) => {
  const { username, password } = req.body;
  console.log("Login attempt:", { username, password });

  try {
    const {
      user,
      accessToken,
      refreshToken: refreshTokenValue,
    } = await login(username, password);

    // 設置 refresh token 到 httpOnly cookie
    setRefreshTokenCookie(res, refreshTokenValue);

    res.json({
      message: "Login successful",
      username: user.username,
      token: accessToken,
    });
  } catch (error) {
    console.error("Error logging in:", error);
    return next(error);
  }
};

const refreshAccessToken = async (req, res, next) => {
  const oldRefreshToken = req.cookies.refreshToken;

  try {
    const { accessToken, refreshToken: newRefreshToken } = await refreshToken(
      oldRefreshToken,
    );

    // 設置新的 refresh token 到 cookie,取代舊的
    setRefreshTokenCookie(res, newRefreshToken);

    res.json({
      message: "Token refreshed successfully",
      token: accessToken,
    });
  } catch (error) {
    console.error("Invalid refresh token:", error);
    // 如果 refresh token 無效,清除 cookie
    clearRefreshTokenCookie(res);
    return next(error);
  }
};

const logoutUser = async (req, res, next) => {
  clearRefreshTokenCookie(res);

  res.json({
    message: "Logout successful",
  });
};

const revokeAllTokensHandler = async (req, res, next) => {
  try {
    const userId = req.user.id;

    // 增加 token_version,使所有現有的 refresh token 失效
    await revokeAllTokens(userId);

    // 清除當前裝置的 cookie
    clearRefreshTokenCookie(res);

    res.json({
      message:
        "All refresh tokens have been revoked. Please login again on all devices.",
    });
  } catch (error) {
    console.error("Error revoking tokens:", error);
    return next(error);
  }
};

export {
  registerUser,
  loginUser,
  refreshAccessToken,
  logoutUser,
  revokeAllTokensHandler as revokeAllTokens,
};
