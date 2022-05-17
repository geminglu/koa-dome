const { addr } = require("../db");

class AddrService {
  /**
   * 添加收货人地址
   * @param {*} date
   * @returns
   */
  async createAddr(date) {
    return await addr.create(date);
  }

  /**
   * 获取收件地址
   * @param {string} id 用户id
   * @returns
   */
  async queryAddr(id) {
    return await addr.findAll({
      where: { user_id: id },
      attributes: [
        "id",
        "consignee",
        "phone",
        "address",
        "is_default",
      ],
    });
  }
}

module.exports = new AddrService();
