// server/src/controllers/AuthController.js
//회원가입(POST /register), 로그인(POST /login) 등의 로직을 처리하는곳입니다.
// 비밀번호 해시(bcrypt), JWT 발급(jsonwebtoken) 기능 사용

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    // 유저 중복 체크기능 설정해둠
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "이미 사용중인 username입니다." });
    }

    // 비밀번호 해시처리 해둠
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // DB에 저장
    await User.create({
      username,
      password: hashedPassword,
    });

    return res.json({ message: "회원가입 성공" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "서버 에러" });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // 유저 조회
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "잘못된 사용자명 혹은 비밀번호입니다. 다시 시도해주세요" });
    }

    // 비밀번호 검사
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "잘못된 사용자명 혹은 비밀번호입니다. 다시 시도해주세요." });
    }

    // JWT 발급
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" } // 토큰 유효기간 1일로 설정해둠.
    );

    return res.json({ message: "로그인 성공", token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "서버 에러" });
  }
};
