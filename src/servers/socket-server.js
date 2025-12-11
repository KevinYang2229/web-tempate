import express from "express";
import http from "http";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { Server } from "socket.io";
import { initializeSocketHandlers } from "../services/socket-service.js";
import { SOCKET_SERVER_PORT } from "../configs/constants.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log(__dirname);

// Socket 服務專用的靜態文件
app.use(express.static("socket-public"));

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "socket-public", "index.html"));
});

// 初始化 Socket.IO 事件處理
initializeSocketHandlers(io);

const PORT = SOCKET_SERVER_PORT;
server.listen(PORT, () => {
  console.log(`Socket server is running on port ${PORT}`);
});

export default io;
