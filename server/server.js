// server/server.js
// 모든 설정 총집합, Express + Socket.IO 서버를 구동하는 메인 엔트리

// env, express, http, cors, db 연결, 라우트, socket.io 설정 variables
require("dotenv").config(); 
const express = require("express");
const http = require("http");
const cors = require("cors");
const connectDB = require("./src/config/db");
const authRoutes = require("./src/routes/authRoutes");
const path = require("path");

// Socket
const { Server } = require("socket.io");
const chatSocket = require("./src/socket/chatSocket");


// 1) DB 연결
connectDB(process.env.DB_URI);

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// 2) 미들웨어
app.use(cors());
app.use(express.json());

// 3) 라우트
app.use("/api/auth", authRoutes);

// 예시: 인증 필요 라우트 (JWT 미들웨어)
const { verifyToken } = require("./src/middlewares/authMiddleware");
app.get("/api/protected", verifyToken, (req, res) => {
  return res.json({ message: "토큰이 유효함", user: req.user });
});


// 정적 파일 서빙 (client/build 내부 파일들을 정적으로 제공)
app.use(express.static(path.join(__dirname, '../client/build')));

// SPA 처리: 나머지 모든 GET 요청을 React의 index.html로 포워딩
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});


// 4) Socket IO 세팅
chatSocket(io);

// 소켓 연결
io.on('connection', (socket) => {
  console.log('새 유저 접속:', socket.id);


  // 클라이언트에서 메시지를 보내면 브로드캐스트
  socket.on('chat message', (msg) => {
    console.log('메시지:', msg);
    io.emit('chat message', msg); 
  });

    // 기존 이벤트들
  socket.on("update tier", (updatedTier) => {

    // 받아온 tier 정보를 전체 유저에게 전송
    io.emit("tier updated", updatedTier);
    socket.broadcast.emit("tier updated", updatedTier);
  });

  socket.on("character selected", (character) => {
    socket.broadcast.emit("character highlight", {
      character,
      socketId: socket.id,
    });
  });

  socket.on('disconnect', () => {
    console.log('유저 나감:', socket.id);
  });
});

// 5) 서버 실행
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
