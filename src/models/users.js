import { pool } from "../configs/db.js";
import logger from "../utils/logger.js";

const createUser = async (username, passwordHash, email) => {
  const [result] = await pool.query(
    "INSERT INTO users (username, password_hash, email) VALUES (?, ?, ?)",
    [username, passwordHash, email],
  );
  const id = result.insertId;
  const [userRaw] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);

  return userRaw[0];
};

const getUserByUsername = async (username) => {
  const [userRaw] = await pool.query("SELECT * FROM users WHERE username = ?", [
    username,
  ]);

  logger.info(`getUserByUsername: Retrieved user for username=${username}`);

  return userRaw[0];
};

const getUserById = async (id) => {
  const [userRaw] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
  return userRaw[0];
};

const incrementTokenVersion = async (userId) => {
  await pool.query(
    "UPDATE users SET token_version = token_version + 1 WHERE id = ?",
    [userId],
  );
  logger.info(
    `incrementTokenVersion: Incremented token_version for user=${userId}`,
  );
};

export { createUser, getUserByUsername, getUserById, incrementTokenVersion };
