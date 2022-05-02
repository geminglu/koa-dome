const { createUser, getName, getEmail } = require("../service/user");
const gravatar = require("gravatar");
const { USERNAME } = require("../utils/regexp");

class userContriller {
  /**
   * 注册接口
   * @param {*} ctx
   * @param {*} next
   * @returns
   */
  async register(ctx, next) {
    const { email, name, password } = ctx.request.body;
    if (!(email && name && password)) {
      ctx.status = 500;
      ctx.body = { success: false, message: "缺少参数" };
      return;
    }
    if (!USERNAME.test(name)) {
      ctx.status = 500;
      ctx.body = { success: false, message: "用户名不符合规范" };
      return;
    }
    //gravatar的使用模板
    //pg是一种图片格式，网站中还有g，r，x三种格式
    //404是没有上传或者注册时会报错，可以改成mm这样的话就会使用默认的头像
    const avatar = gravatar.url(email, { s: "200", r: "pg", d: "mm" });
    try {
      const [isName, isEmail] = await Promise.all([
        getName(name),
        getEmail(email),
      ]);
      if (isName) {
        ctx.status = 409;
        ctx.body = { success: false, message: "用户名已存在" };
        return;
      }
      if (isEmail) {
        ctx.status = 409;
        ctx.body = { success: false, message: "邮箱已存在" };
        return;
      }
      const result = await createUser({ email, name, password, avatar });
      ctx.status = 200;
      ctx.body = result;
    } catch (error) {
      console.log("error", error);
      ctx.status = 500;
      ctx.body = { success: false, message: error };
    }
  }

  async login(ctx) {}
  async profile() {}
}

module.exports = new userContriller();
