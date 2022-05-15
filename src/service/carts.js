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
}

module.exports = new CartsService();
