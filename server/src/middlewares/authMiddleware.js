// server/src/middlewares/authMiddleware.js
// JWT를 검증하는 미들웨어

const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization; 
  //Authorization: Bearer TOKEN 형태를 사용함
  // 토큰 테스트 기능 추가

  if (!authHeader) {
    return res.status(401).json({ message: "토큰이 없습니다." });
  }

  // Bearer 분리해둠
  const token = authHeader.split(" ")[1]; 
  if (!token) {
    return res.status(401).json({ message: "토큰이 없습니다." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // 토큰이 유효하면 payload(decooded)를 req.user에 저장
    req.user = decoded;
    next(); 
  } catch (error) {
    return res.status(403).json({ message: "유효하지 않은 토큰" });
  }
};
