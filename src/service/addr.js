const { addr } = require("../db");

class AddrService {
  /**
   * 添加收货人地址
   * @param {*} date
   * @returns
   */
  async createAddr(date) {
    // 如果有将该条记录的is_feault设置为true，需要先将该用户下的所有记录的is_default设置为false，因为只能有一个收件地址
    if (date.is_default) {
      await addr.update(
        { is_default: false },
        { where: { user_id: date.user_id } }
      );
    }
    return await addr.create(date);
  }

  /**
   * 获取收件地址列表
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
    // 如果有将该条记录的is_feault设置为true，需要先将该用户下的所有记录的is_default设置为false，因为只能有一个收件地址
    if (body.is_default) {
      await addr.update({ is_default: false }, { where: { user_id } });
    }
    return await addr.update(body, { where: { user_id, id } });
  }

  /**
   * 删除收件地址
   * @param {*} user_id 用户id
   * @param {*} id 收件地址id
   * @returns
   */
  async removeAddr(user_id, id) {
    return await addr.destroy({ where: { user_id, id } });
  }

  /**
   * 设置默认地址
   * @param {*} user_id 用户id
   * @param {*} id 收件地址id
   * @returns
   */
  async defaultAddr(user_id, id) {
    // 因为只能有一个默认收获地址所以需要先将所有的is_default设置为false，在设置指定id地址的is_default为true
    await addr.update({ is_default: false }, { where: { user_id } });
    return await addr.update({ is_default: true }, { where: { user_id, id } });
  }
}

module.exports = new AddrService();
