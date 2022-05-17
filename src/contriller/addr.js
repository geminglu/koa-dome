const { createAddr, queryAddr } = require("../service/addr");

class AddrContriller {
  /**
   * 添加收件地址
   * @param {*} ctx
   * @param {*} next
   */
  async addAddr(ctx, next) {
    const { id: user_id } = ctx.state.user;
    const { consignee, phone, address, is_default } = ctx.request.body;
    try {
      const addrData = await queryAddr(user_id);
      if (addrData.length >= 10) {
        ctx.status = 200;
        ctx.body = {
          message: "最多创建10条",
        };
      } else {
        const res = await createAddr({
          user_id,
          consignee,
          phone,
          address,
          is_default,
        });
        ctx.status = 200;
        ctx.body = {
          data: res,
        };
      }
    } catch (error) {}
    await next();
  }

  /**
   * 获取收件地址
   * @param {*} ctx
   * @param {*} next
   */
  async getAddr(ctx, next) {
    const { id } = ctx.state.user;
    try {
      const res = await queryAddr(id);
      ctx.status = 200;
      ctx.body = {
        data: res,
      };
    } catch (error) {}
    await next();
  }
}

module.exports = new AddrContriller();
