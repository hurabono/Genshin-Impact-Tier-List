// server/src/socket/chatSocket.js
// 서버에서 io.on("connection")으로 연결을 받고 > 그리고 필요한 이벤트를 처리

module.exports = (io) => {
    // connection 이벤트는 클라이언트가 소켓 연결을 맺을 때마다 발생
    io.on("connection", (socket) => {
      console.log("클라이언트 소켓 연결됨:", socket.id);
  
      // 채팅 메시지를 받아서 모든 소켓에게 브로드캐스트
      socket.on("chat", (data) => {
        // data: { nickname, message }
        io.emit("chat", data);
      });
  
      socket.on("disconnect", () => {
        console.log("소켓 연결 해제:", socket.id);
      });
    });
  };
  