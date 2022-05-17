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
      attributes: ["id", "consignee", "phone", "address", "is_default"],
    });
  }

  /**
   * 获取收件地址详情
   * @param {string} user_id 用户id
   * @param {string} id 收件地址id
   * @returns
   */
  async queryAddrDetails(user_id, id) {
    return await addr.findOne({
      where: { user_id, id },
      attributes: ["id", "consignee", "phone", "address", "is_default"],
    });
  }

  /**
   * 更新收件地址详情
   * @param {string} user_id
   * @param {string} id
   * @param {{ consignee:string, phone:string, address:string, is_default:boolean }} data
   * @returns
   */
  async upDateAddr(user_id, id, body) {
    return await addr.update(body, { where: { user_id, id } });
  }

  async removeAddr(user_id, id) {
    return await addr.destroy({ where: { user_id, id } });
  }
}

module.exports = new AddrService();
