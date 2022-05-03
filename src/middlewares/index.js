const bcrypt = require("bcryptjs");
const { getUserInfo } = require("../service/user");
const { USERNAME } = require("../utils/regexp");

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
   * 登录验证用户
   * @param {*} ctx
   * @param {*} next
   */
  async verifyLogin(ctx, next) {
    // 1.判断用户名是否存在，不存在报错；
    // 2.判断密码是否正确，不正确报错
    const { name, password } = ctx.request.body;

    if (!(name || password)) {
      ctx.status = 409;
      ctx.body = { message: "用户名和密码不能为空" };
      return;
    }
    try {
      const result = await getUserInfo({ name });
      if (!result) {
        ctx.status = 409;
        ctx.body = { message: "用户不存在" };
        return;
      }
      if (!bcrypt.compareSync(password, result.password)) {
        ctx.status = 409;
        ctx.body = { message: "密码错误" };
        return;
      }
    } catch (error) {
      ctx.status = 409;
      ctx.body = { message: "登录失败" };
      return;
    }
    await next();
  }

  /**
   * 验证邮箱用户名密码是否为空
   * @param {*} ctx
   * @param {*} next
   */
  async validRequired(ctx, next) {
    const { password, email, name } = ctx.request.body;
    if (!(email && name && password)) {
      ctx.status = 409;
      ctx.body = { message: "必填参数不能为空" };
      return;
    }
    if (!USERNAME.test(name)) {
      ctx.status = 409;
      ctx.body = { message: "用户名不符合规范" };
      return;
    }
    await next();
  }
}

module.exports = new middlewares();
