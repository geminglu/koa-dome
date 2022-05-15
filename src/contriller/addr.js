const { createAddr } = require("../service/addr");

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
      const res = await createAddr({
        attributes: { exclude: ["updatedAt", "createdAt"] },
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
    } catch (error) {}
    await next();
  }
}

module.exports = new AddrContriller();
