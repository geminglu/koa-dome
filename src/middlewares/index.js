const bcrypt = require("bcryptjs");
const { getUserInfo } = require("../service/user");
const { userDoesNotExist, userLoginError } = require("../constant/errType");

class middlewares {
  /**
   * 加盐加密
   * @param {*} ctx
   * @param {*} next
   */
  async crpyPassword(ctx, next) {
    const { password } = ctx.request.body;

    // 对传递过来的密码进行加密，需要安装一个bcrypt包
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    ctx.request.body.password = hash;

    await next();
  }

  /**
   * 验证用户
   * @param {*} ctx
   * @param {*} next
   */
  async verifyLogin(ctx, next) {
    // 1.判断用户名是否存在，不存在报错；
    // 2.判断密码是否正确，不正确报错
    const { name, password } = ctx.request.body;

    if (!(name || password)) {
      return ctx.app.emit("error", userFormateError, ctx);
    }
    try {
      const result = await getUserInfo({ name });
      if (!result) {
        return ctx.app.emit("error", userDoesNotExist, ctx);
      }
      if (!bcrypt.compareSync(password, result.password)) {
        return ctx.app.emit("error", invalidPassword, ctx);
      }
    } catch (error) {
      console.log(error);
      return ctx.app.emit("error", userLoginError, ctx);
    }
    await next();
  }
}

module.exports = new middlewares();
