// src/socket.js
// 채팅을 담당하는 백엔드와 연결된  소켓 클라이언트입니다

import { io } from 'socket.io-client';

export function createSocket(token) {
  const socket = io('https://genshin-impact-tier-list-server.onrender.com/', {
    auth: {
      token,
    },
    autoConnect: true,
  });

  return socket;
}


