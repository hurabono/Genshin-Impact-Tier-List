// src/socket.js
// 채팅을 담당하는 백엔드와 연결된  소켓 클라이언트입니다

import { io } from 'socket.io-client';

const socket = io('http://localhost:4000', {
  autoConnect: false, 
});

export default socket;
