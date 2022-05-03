const jwt = require("jsonwebtoken");
const { createUser, getUserInfo, getEmail } = require("../service/user");
const gravatar = require("gravatar");
const { USERNAME } = require("../utils/regexp");
const { userLoginError } = require("../constant/errType");

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
        getUserInfo({ name }),
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

    await next();
  }

  async login(ctx, next) {
    const { name: n } = ctx.request.body;
    const { JWT_SECRET } = process.env;
    try {
      const { id, name, email } = await getUserInfo({ name: n });
      const token = jwt.sign({ id, name, email }, JWT_SECRET, {
        expiresIn: 3600,
      });
      ctx.status = 200;
      ctx.body = {
        success: true,
        data: {
          token,
        },
      };
      ctx.cookies.set("token", token, {
        path: "/",
        expires: new Date(Date.now() + 2592000000), // 有效期
        httpOnly: true, // document.cookie不可读
      });
    } catch (error) {
      console.log(error);
      return ctx.app.emit("error", userLoginError, ctx);
    }
    await next();
  }
  async profile(ctx, next) {
    const { id } = ctx.state.user;
    console.log({ id });
    const { id: _id, name, email, avatar } = await getUserInfo({ id });
    console.log(_id, name, email, avatar);
    ctx.status = 200;
    ctx.body = {
      success: true,
      data: {
        id: _id,
        name,
        email,
        avatar,
      },
    };
  }
}

module.exports = new userContriller();
