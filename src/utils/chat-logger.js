import fs from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 聊天記錄日誌路徑
const chatLogPath = join(__dirname, "..", "..", "logs", "chat.log");

/**
 * 寫入聊天記錄的函數
 * @param {string} type - 日誌類型 (JOIN, LEAVE, MESSAGE, RENAME)
 * @param {string} username - 用戶名稱
 * @param {string} message - 訊息內容
 * @param {string} socketId - Socket ID (可選)
 */
export function logChatMessage(type, username, message, socketId = "") {
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] [${type}] ${username} ${
    socketId ? `(${socketId})` : ""
  }: ${message}\n`;

  fs.appendFile(chatLogPath, logEntry, (err) => {
    if (err) {
      console.error("Failed to write chat log:", err);
    }
  });
}
