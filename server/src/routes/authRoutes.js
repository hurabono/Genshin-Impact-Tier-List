// server/src/routes/authRoutes.js
// 라우터를 이용해 /api/auth/ 경로로 회원가입, 로그인 등의 요청을 처리

const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController");

// POST /api/auth/register
router.post("/register", AuthController.register);

// POST /api/auth/login
router.post("/login", AuthController.login);

module.exports = router;
