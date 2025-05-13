// server/src/config/db.js
// 몽고디비 데이터베이스 설정트리

const mongoose = require("mongoose");

const connectDB = async (dbUri) => {
  try {
    await mongoose.connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB 연결 성공");
  } catch (error) {
    console.error("MongoDB 연결 실패:", error);
    process.exit(1); // 연결 실패 시 종료
  }
};

module.exports = connectDB;
