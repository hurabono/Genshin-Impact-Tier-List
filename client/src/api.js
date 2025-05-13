import axios from 'axios';

const API = axios.create({
  baseURL: 'https://genshin-impact-tier-list-server.onrender.com/api',
});

// 매 요청 전에 토큰을 헤더에 설정
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;