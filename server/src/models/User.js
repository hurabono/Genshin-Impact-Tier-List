// server/src/models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, 
  },
  password: {
    type: String,
    required: true,
  },
});

// 예: createdAt, updatedAt 자동으로 발생되게 설정
userSchema.set("timestamps", true);

module.exports = mongoose.model("User", userSchema);
