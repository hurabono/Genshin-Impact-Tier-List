// src/App.js
import React, { useState } from "react";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import ChatContainer from './ChatContainer';


function App() {
  // 앱이 처음 마운트될 때 localStorage에서 token을 읽어 초기값으로 설정 (바꾸지말것)
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");

  // 로그인 성공 시 받은 토큰을 localStorage에 저장하고 상태 업데이트 (바꾸지말것)
  const handleLoginSuccess = (tk) => {
    localStorage.setItem("token", tk);
    setToken(tk);
  };

  // 로그아웃 시 localStorage에서 토큰 삭제하고 상태 초기화 (바꾸지말것)
<ChatContainer />
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
  };

  return (
    <>
      {!token ? (
        <LoginPage onLoginSuccess={handleLoginSuccess} />
      ) : (
        <MainPage onLogout={handleLogout} token={token} />
        
      )}
    </>
  );
}

export default App;
