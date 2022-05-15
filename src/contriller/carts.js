const jwt = require("jsonwebtoken");
const { addCartsService, queryCarts, getCarts, upDataCarts } = require("../service/carts");

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

  async upCarts(ctx, next) {
    // 每个用户只能更新自己的购物车列表，需要先查询一下当前用户的购物车是否有这个商品
    const { id: user_id } = ctx.state.user;
    const { id: carts_id } = ctx.request.params;
    const { selected, number } = ctx.request.body;
    try {
      const cartsGoodsInfo = await getCarts(user_id, carts_id);
      if (!cartsGoodsInfo) {
        ctx.status = 400;
        ctx.body = { message: "商品信息不存在" };
        return;
      }
      const res = await upDataCarts(carts_id, selected, number);
      ctx.status = 200;
      ctx.body = { data: res };
    } catch (error) {
      console.log("err", error);
    }
    await next();
  }
}

module.exports = new CartsContriller();
