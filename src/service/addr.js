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
}

module.exports = new AddrService();
