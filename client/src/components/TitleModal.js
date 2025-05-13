// src/components/TitleModal.js
import React, { useState, useEffect } from "react";

function TitleModal({ isOpen, onClose, currentTitle, onSave }) {
  const [tempTitle, setTempTitle] = useState("");

  useEffect(() => {
    // 모달 열릴 때마다 현재 타이틀로 초기화
    if (isOpen) {
      setTempTitle(currentTitle);
    }
  }, [isOpen, currentTitle]);

  if (!isOpen) return null; // isOpen이 false면 표시 안함

  const handleOk = () => {
    if (tempTitle.trim()) {
      onSave(tempTitle.trim());
    }
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div className="modal-overlay fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="modal bg-white p-5 border border-gray-400 rounded w-80">
        <h2 className="text-lg font-bold mb-3">타이틀 설정</h2>
        <input
          type="text"
          className="border border-gray-400 w-full px-2 py-1 mb-3"
          value={tempTitle}
          onChange={(e) => setTempTitle(e.target.value)}
        />
        <div className="modal-buttons flex gap-2 justify-end">
          <button
            className="border border-gray-400 bg-gray-200 px-3 py-1"
            onClick={handleOk}
          >
            확인
          </button>
          <button
            className="border border-gray-400 bg-gray-200 px-3 py-1"
            onClick={handleCancel}
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
}

export default TitleModal;
