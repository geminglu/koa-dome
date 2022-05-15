const jwt = require("jsonwebtoken");
const { addCartsService, queryCarts } = require("../service/carts");

class CartsContriller {
  /**
   * 加入购物车
   * @param {*} ctx
   * @param {*} next
   * @returns
   */
  async addCarts(ctx, next) {
    const { goods_id, number } = ctx.request.body;
    const { id } = ctx.state.user;
    try {
      const res = await addCartsService({ goods_id, number, user_id: id });
      ctx.status = 200;
      ctx.body = res;
    } catch (error) {
      ctx.status = 500;
      ctx.body = {
        message: "操作失败",
      };
    }
    await next();
  }

  /**
   * 查询购物车列表
   * @param {*} ctx 
   * @param {*} next 
   */
  async getCarts(ctx, next) {
    const { id } = ctx.state.user;
    const { pageSize = 10, pageNum = 1 } = ctx.request.query;
    try {
      const res = await queryCarts(id, pageSize, pageNum);
      ctx.status = 200;
      ctx.body = {
        data: res,
      };
    } catch (error) {}
    await next();
  }
}

module.exports = new CartsContriller();
