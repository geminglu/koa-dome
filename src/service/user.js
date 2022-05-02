const { user } = require("../db");
const bcrypt = require("bcryptjs");


class UserService {
  /**
   * 创建用户
   * @param {{ name:string, password:string, email:string, avater:string }} data
   * @returns
   */
  async createUser(data) {
    const { name, password, email, avatar } = data;
    return await user.create({
      name,
      email,
      password: bcrypt.hashSync(password, 10),  // 对传递过来的密码进行加密，需要安装一个bcrypt包
      avatar,
    });
  }

  /**
   * 查询用户名
   * @param {name:string} name
   * @returns
   */
  async getName(name) {
    return await user.findOne({ where: { name } });
  }

  /**
   * 查询邮箱
   * @param {email:string} email
   * @returns
   */
   async getEmail(email) {
    return await user.findOne({ where: { email } });
  }
}

module.exports = new UserService();
