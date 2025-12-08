import { logChatMessage } from "../utils/chat-logger.js";

/**
 * 初始化 Socket.IO 事件處理
 * @param {Server} io - Socket.IO 服務器實例
 */
export function initializeSocketHandlers(io) {
  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    // 將用戶名稱儲存在 socket 物件上
    socket.data.username = `訪客${socket.id.slice(0, 4)}`;

    // 記錄用戶加入
    logChatMessage("JOIN", socket.data.username, "加入聊天室", socket.id);

    // 接收用戶名稱設定
    socket.on("set-username", (name) => {
      handleSetUsername(socket, io, name);
    });

    // 通知所有人有新用戶加入
    socket.broadcast.emit("user-joined", {
      socketId: socket.id,
      username: socket.data.username,
    });

    // 接收訊息並廣播給所有人
    socket.on("message", (message) => {
      handleMessage(socket, message);
    });

    // 處理用戶斷線
    socket.on("disconnect", () => {
      handleDisconnect(socket);
    });
  });
}

/**
 * 處理用戶設定名稱
 * @param {Socket} socket - Socket 實例
 * @param {Server} io - Socket.IO 服務器實例
 * @param {string} name - 新的用戶名稱
 */
function handleSetUsername(socket, io, name) {
  const oldName = socket.data.username;
  socket.data.username = name;
  console.log(`User ${socket.id} set username: ${socket.data.username}`);

  // 記錄改名
  logChatMessage(
    "RENAME",
    oldName,
    `改名為 ${socket.data.username}`,
    socket.id,
  );

  // 通知所有人用戶名稱變更
  io.emit("username-changed", {
    socketId: socket.id,
    oldName: oldName,
    newName: socket.data.username,
  });
}

/**
 * 處理用戶發送訊息
 * @param {Socket} socket - Socket 實例
 * @param {string} message - 訊息內容
 */
function handleMessage(socket, message) {
  console.log(
    `Message from ${socket.data.username} (${socket.id}): ${message}`,
  );

  // 記錄聊天訊息
  logChatMessage("MESSAGE", socket.data.username, message, socket.id);

  // 廣播給所有其他用戶(不包括發送者)
  socket.broadcast.emit("message", {
    senderId: socket.id,
    username: socket.data.username,
    message: message,
    timestamp: new Date().toISOString(),
  });
}

/**
 * 處理用戶斷線
 * @param {Socket} socket - Socket 實例
 */
function handleDisconnect(socket) {
  console.log("User disconnected:", socket.id);

  // 記錄用戶離開
  logChatMessage("LEAVE", socket.data.username, "離開聊天室", socket.id);

  // 通知所有人有用戶離開
  socket.broadcast.emit("user-left", {
    socketId: socket.id,
    username: socket.data.username,
  });
}
