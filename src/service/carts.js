const { carts, goods } = require("../db");
const { Op } = require("sequelize");

carts.belongsTo(goods, {
  foreignKey: "goods_id",
  as: "goods_info",
});

class CartsService {
  /**
   * 添加商品到购物车
   * @param {*} param
   * @returns
   */
  async addCartsService({ goods_id, user_id, number: num }) {
    // 根据商品id和用户id查找购车中的商品然后修改数量，如果没有查找到对应的商品就创建一条记录
    const res = await carts.findOne({
      where: {
        [Op.and]: [{ goods_id }, { user_id }],
      },
    });
    if (res) {
      if (num) {
        await res.update({ number: num });
        return await res.reload();
      }
      await res.increment({ number: 1 });
      return await res.reload();
    }
    return await carts.create({ goods_id, user_id });
  }

  /**
   * 查询当前用户下的购物车列表
   * @param {*} id
   * @param {*} pageSize
   * @param {*} pageNum
   * @returns
   */
  async queryCarts(id, pageSize, pageNum) {
    const offset = (pageNum - 1) * pageSize;
    const { count, rows } = await carts.findAndCountAll({
      where: {
        user_id: id,
      },
      include: {
        model: goods,
        as: "goods_info",
        attributes: [
          "id",
          "goods_name",
          "goods_price",
          "goods_num",
          "goods_img",
        ],
      },
      attributes: ["id", "number", "selected"],
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

  /**
   * 查询购物车指定商品明细
   * @param {string} user_id 用户id
   * @param {string} carts_id 购物车id
   */
  async getCarts(user_id, carts_id) {
    const result = await carts.findOne({
      where: {
        [Op.and]: [{ id: carts_id }, { user_id }],
      },
      attributes: ["id", "number", "selected"],
      include: {
        model: goods,
        as: "goods_info",
        attributes: [
          "id",
          "goods_name",
          "goods_price",
          "goods_num",
          "goods_img",
        ],
      },
    });
    return result;
  }

  async upDataCarts(carts_id, selected, number) {
    const result = await carts.findByPk(carts_id, {
      attributes: ["id", "number", "selected"],
      include: {
        model: goods,
        as: "goods_info",
        attributes: [
          "id",
          "goods_name",
          "goods_price",
          "goods_num",
          "goods_img",
        ],
      },
    });
    if (selected !== undefined) result.selected = selected;
    if (number !== undefined) result.number = number;
    return result.save();
  }
}

module.exports = new CartsService();
