// src/components/ChatBox.js
import React from "react";


function ChatBox({
  messages,
  nickname,
  onChangeNickname,
  chatInput,
  onChangeChatInput,
  onSendChat,
}) {
  return (
    <div className="chat-area flex p-5 gap-3 h-[175px] ">
      <div className="text-white chat-messages flex-1 border-2 border-blue-800 bg-gray-800 bg-opacity-70 overflow-y-auto p-2 rounded-md">
        {messages.map((msg, idx) => (
          <div key={idx}>
            <strong>{msg.nickname}:</strong> {msg.message}
          </div>
        ))}
      </div>
      <div className="chat-input-area w-[750px] flex flex-col gap-2">
        <input
          type="text"
          placeholder="닉네임"
          className=" bg-blue-900 bg-opacity-70 p-1 text-white outline-none "
          value={nickname}
          onChange={(e) => onChangeNickname(e.target.value)}
        />
        <input
          type="text"
          placeholder="채팅치는곳"
          className="bg-blue-900 bg-opacity-70 p-1 text-white outline-none"
          value={chatInput}
          onChange={(e) => onChangeChatInput(e.target.value)}
        />
        <button
          className="tracking-widrest text-white bg-blue-400 border-2 border-blue-800  px-3 py-1 h-[3.5rem] text-lg rounded-md"
          onClick={onSendChat}
        >
          전송
        </button>
      </div>
    </div>
  );
}

export default ChatBox;
