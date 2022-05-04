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
    return await goods.destroy({ where: { id }, force: true });
  }

  /**
   * 下架商品
   * @param {*} id
   * @returns
   */
  async removeGoods(id) {
    return await goods.destroy({ where: { id } });
  }

  /**
   * 上架架商品
   * @param {*} id
   * @returns
   */
  async restoreGoods(id) {
    return await goods.restore({ where: { id } });
  }

  /**
   * 查询商品
   * @param {*} pageNum
   * @param {*} pageSize
   */
  async queryGoods(pageNum, pageSize) {
    const offset = (pageNum - 1) * pageSize;
    const { count, rows } = await goods.findAndCountAll({
      attributes: { exclude: ["deletedAt"]},
      offset,
      limit: Number(pageSize),
    });
    return {
      pageNum,
      pageSize,
      total: count,
      list: rows,
    };
  }
}

module.exports = new GoodsService();
