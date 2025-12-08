import express from "express";
import http from "http";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { Server } from "socket.io";
import { initializeSocketHandlers } from "../shared/services/socket-service.js";
import { SOCKET_SERVER_PORT } from "../shared/configs/constants.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Socket 服務專用的靜態文件
app.use(express.static(join(__dirname, "socket-public")));

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "../socket-public", "index.html"));
});

// 初始化 Socket.IO 事件處理
initializeSocketHandlers(io);

const PORT = SOCKET_SERVER_PORT;
server.listen(PORT, () => {
  console.log(`Socket server is running on port ${PORT}`);
});

export default io;
