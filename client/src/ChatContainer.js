// src/ChatContainer.js
// 실시간 채팅 socket을 사용하여 메시지를 주고받는 컴포넌트 로직 입니다!

import React, { useEffect, useState } from 'react';
import ChatBox from './components/ChatBox';
import socket from './socket';

function ChatContainer() {
  const [messages, setMessages] = useState([]);
  const [nickname, setNickname] = useState('');
  const [chatInput, setChatInput] = useState('');

  useEffect(() => {
    socket.connect();

    socket.on('chat message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSendChat = () => {
    if (nickname.trim() && chatInput.trim()) {
      const msgObj = {
        nickname,
        message: chatInput,
      };
      socket.emit('chat message', msgObj);
      setChatInput('');
    }
  };

  return (
    <ChatBox
      messages={messages}
      nickname={nickname}
      onChangeNickname={setNickname}
      chatInput={chatInput}
      onChangeChatInput={setChatInput}
      onSendChat={handleSendChat}
    />
  );
}

export default ChatContainer;
