const jwt = require("jsonwebtoken");
const { getUserInfo } = require("../service/user");

class Auth {
  /**
   * 是否登录
   * @param {*} ctx
   * @param {*} next
   * @returns
   */
  async auth(ctx, next) {
    const { JWT_SECRET } = process.env;
    const { authorization } = ctx.request.header;
    if (!authorization) {
      ctx.status = 401;
      ctx.body = { message: "token无效" };
      return;
    }
    try {
      const token = jwt.verify(
        authorization.replace("Bearer ", ""),
        JWT_SECRET
      );
      const { id } = token;
      const res = await getUserInfo({ id });
      ctx.state.user = res;
    } catch (error) {
      ctx.status = 401;
      ctx.body = { message: error.message };
      return;
    }
    await next();
  }

  /**
   * 验证是否为管理员
   * @param {*} ctx
   * @param {*} next
   * @returns
   */
  async hadAdmin(ctx, next) {
    const { id } = ctx.state.user;
    try {
      const res = await getUserInfo({ id });
      if (res.role !== 0) {
        ctx.status = 403;
        ctx.body = { message: "权限不足" };
        return;
      }
    } catch (error) {
      ctx.status = 500;
      ctx.body = error;
      return;
    }
    await next();
  }
}
module.exports = new Auth();
