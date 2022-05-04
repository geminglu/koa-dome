const { goods } = require("../db");

class GoodsService {
  /**
   * 创建商品信息
   * @param {*} data 商品信息
   */
  async createGoods(data) {
    return await goods.create(data);
  }

  /**
   * 查询商品
   * @param {parma: object} parma
   * @returns
   */
  async getGoodsInfo(parma) {
    return await goods.findOne({ where: parma });
  }

  /**
   * 修改商品
   * @param {*} id
   * @param {*} body
   * @returns
   */
  async updataGoods(id, body) {
    return await goods.update(body, { where: { id } });
  }

  /**
   * 强制删除商品
   * @param {*} id 
   * @returns 
   */
  async removeMandatoryGoods(id) {
    return await goods.destroy({ where: { id } });
  }
}

module.exports = new GoodsService();
