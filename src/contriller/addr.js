const {
  createAddr,
  queryAddr,
  queryAddrDetails,
  upDateAddr,
  removeAddr,
  defaultAddr,
} = require("../service/addr");

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
    } catch (error) {
      console.log(error);
    }
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

  /**
   * 获取收件地址详情
   * @param {*} ctx
   * @param {*} next
   */
  async getAddrDetails(ctx, next) {
    const { id: user_id } = ctx.state.user;
    const { id } = ctx.request.params;
    try {
      const res = await queryAddrDetails(user_id, id);
      ctx.status = 200;
      ctx.body = {
        data: res,
      };
    } catch (error) {
      console.log(error);
    }
    await next();
  }

  /**
   * 更新收件地址详情
   * @param {*} ctx
   * @param {*} next
   */
  async upDateAddrDetails(ctx, next) {
    const { id: user_id } = ctx.state.user;
    const { id } = ctx.request.params;
    const { consignee, phone, address, is_default } = ctx.request.body;
    try {
      const res = await upDateAddr(user_id, id, {
        consignee,
        phone,
        address,
        is_default,
      });
      if (res) {
        ctx.status = 200;
        ctx.body = {
          message: "更新成功",
        };
      } else {
        ctx.status = 400;
        ctx.body = {
          message: "地址不存在",
        };
      }
    } catch (error) {
      console.log(error);
    }
    await next();
  }

  /**
   * 删除收件地址
   * @param {*} ctx
   * @param {*} next
   */
  async deleteAddr(ctx, next) {
    const { id: user_id } = ctx.state.user;
    const { id } = ctx.request.params;
    try {
      const res = await removeAddr(user_id, id);
      if (res) {
        ctx.status = 200;
        ctx.body = {
          message: "删除成功",
        };
      } else {
        ctx.status = 400;
        ctx.body = {
          message: "地址不存在",
        };
      }
    } catch (error) {
      console.log(error);
    }
    await next();
  }

  async setDefaultAddr(ctx, next) {
    const { id: user_id } = ctx.state.user;
    const { id } = ctx.request.params;
    try {
      const res = await defaultAddr(user_id, id);
      if (res) {
        ctx.status = 200;
        ctx.body = {
          message: "设置成功",
        };
      } else {
        ctx.status = 400;
        ctx.body = {
          message: "地址不存在",
        };
      }
    } catch (error) {}
    await next();
  }
}

module.exports = new AddrContriller();
