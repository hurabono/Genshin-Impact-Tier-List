// src/socket.js
import { io } from 'socket.io-client';

// 토큰을 인자로 받아 소켓 연결을 생성하는 함수
export function createSocket(token) {
  const socket = io('https://genshin-impact-tier-list-server.onrender.com/', {
    auth: {
      token,
    },
    autoConnect: true,
  });

  return socket;
}
