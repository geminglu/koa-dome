const jwt = require("jsonwebtoken");
class Auth {
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
}
module.exports = new Auth();
