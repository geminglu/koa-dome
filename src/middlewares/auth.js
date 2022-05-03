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
      ctx.state.user = token;
    } catch (error) {
      ctx.status = 401;
      ctx.body = { message: error.message };
      return;
    }
    await next();
  }

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
