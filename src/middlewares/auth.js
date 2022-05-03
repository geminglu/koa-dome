const jwt = require("jsonwebtoken");
class Auth {
  async auth(ctx, next) {
    const { JWT_SECRET } = process.env;
    const { authorization } = ctx.request.header;
    if (!authorization) {
      return;
    }
    try {
      const token = jwt.verify(
        authorization.replace("Bearer ", ""),
        JWT_SECRET
      );
      ctx.state.user = token;
    } catch (error) {
      console.log(error);
      return;
    }
    await next();
  }
}
module.exports = new Auth();
