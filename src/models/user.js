const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

// 实例化数据模板
const UserSchems = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    set(val) {
        return bcrypt.hashSync(val, 10)  // 对传递过来的密码进行加密，需要安装一个bcrypt包
    }
  },
  avatar: {
    type: String,
  },
  date: {
    type: String,
    default: Date.now,
  },
});

module.exports = User = mongoose.model("users", UserSchems);
