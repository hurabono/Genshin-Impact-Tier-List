// src/ChatContainer.js
import React, { useEffect, useState, useRef } from 'react';
import ChatBox from './components/ChatBox';
import { createSocket } from './socket'; 

function ChatContainer() {
  const [messages, setMessages] = useState([]);
  const [nickname, setNickname] = useState('');
  const [chatInput, setChatInput] = useState('');
  const socketRef = useRef(null); 

  useEffect(() => {
    const token = localStorage.getItem('token'); 
    socketRef.current = createSocket(token); 

    socketRef.current.on('chat message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const handleSendChat = () => {
    if (nickname.trim() && chatInput.trim()) {
      const msgObj = {
        nickname,
        message: chatInput,
      };
      socketRef.current.emit('chat message', msgObj);
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
