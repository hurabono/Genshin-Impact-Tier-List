import axios from 'axios';

const API = axios.create({
  baseURL: 'https://genshin-impact-tier-list-server.onrender.com/api',
});

export default API;