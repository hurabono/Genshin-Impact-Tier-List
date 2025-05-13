// src/components/TitleBar.js
import React from "react";

function TitleBar({ boardTitle, onOpenModal, onShare, onLogout }) {
  return (
    <div className="top-bar w-full h-20 relative">
      {/* 왼쪽 로그아웃 버튼 */}
      <button
        className="logout-btn absolute top-5 left-5 tracking-wider text-white bg-gradient-to-b from-[#2a3597] to-[#1d204b]   border-2 border-blue-700 px-5 py-2 rounded-full text-lg"
        onClick={onLogout}
      >
        로그아웃
      </button>

      {/* 중앙 제목 */}
      
      <h1 className="board-title text-center text-2xl font-bold leading-[80px] text-white">
        {boardTitle}
      </h1>

      {/* 오른쪽 제목 변경하기 버튼 */}
      <button
        className="settings-btn absolute top-5 right-[7rem] tracking-wider text-white bg-gradient-to-b from-[#2a3597] to-[#1d204b]   border-2 border-blue-700 px-5 py-2 rounded-full mr-3 text-lg"
        onClick={onOpenModal}
      >
        제목 변경하기
      </button>

      {/* 오른쪽 공유 버튼 */}
      <button
        className="share-btn absolute top-5 right-5 tracking-wider text-white bg-gradient-to-b from-[#2a3597] to-[#1d204b]   border-2 border-blue-700 px-5 py-2 rounded-full text-lg"
        onClick={onShare}
      >
        공유
      </button>
    </div>
  );
}

export default TitleBar;
