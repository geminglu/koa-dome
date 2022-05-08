const { carts } = require("../db");
const { Op } = require("sequelize");

class CartsService {
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
}

module.exports = new CartsService();
