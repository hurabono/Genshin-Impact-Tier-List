// src/pages/LoginPage.js
import React, { useState } from "react";
import API from "../api";

function LoginPage({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", {
        username,
        password,
      });
      const { token } = res.data;
      alert("로그인 성공!");
      onLoginSuccess(token);
    } catch (err) {
      alert("로그인 실패. 아이디/비밀번호를 확인해주세요.");
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">

<div
      className=" bg-black bg-opacity-25 bg-blend-overlay fixed top-0 left-0 w-full h-full bg-cover bg-no-repeat blur-10"
      style={{
        backgroundImage: `url("/buttonImages/background_logIn.png")`,
      }}
    ></div>

  <div className="relative z-10">
    <div className="w-60 mx-auto mb-0 top-[-50px] relative">
      <img
      src="/buttonImages/logo.png"
      alt="Logo"
      className="w-full mx-auto"
      />
      </div>
      <h1 className="relative top-[-50px] tracking-widrest text-3xl mb-8 text-white text-center font-bold">
        원신 티어 프로그램 <small>ver 1.0</small>
      </h1>
      
  <div className="relative top-[-50px] bg-white bg-opacity-70 p-8 rounded shadow-md w-96">
        <h2 className="text-2xl mb-4 text-black text-center font-bold">로그인</h2>
        <div className="mb-4">
          <label className="text-black block mb-1 font-bold">✨아이디</label>
          <input
            type="text"
            className=" rounded-lg  text-black w-full px-2 py-2 outline-none"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="아이디 입력"
          />
        </div>
        <div className="mb-4">
          <label className="text-black block mb-1 font-bold">✨비밀번호</label>
          <input
            type="password"
            className="bg-opacity-50 text-black rounded-lg border w-full px-2 py-2 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호 입력"
          />
        </div>
        <button
          className="tracking-wider bg-[#2a3597]  border-2 border-blue-700 text-white px-4 py-2 w-full rounded"
          onClick={handleLogin}
        >
          로그인
        </button>
      </div>

  </div>
    


    </div>
  );
}

export default LoginPage;
