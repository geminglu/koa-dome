const { user } = require("../db");

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
      password,
      avatar,
    });
  }

  /**
   * 查询用户名
   * @param {name:string} name
   * @returns
   */
  async getUserInfo(name) {
    console.log("name", name);
    return await user.findOne({ where: { ...name } });
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
