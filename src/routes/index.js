const Router = require("koa-router");

// const users = require("./api/user");
const users = require("./user");

const router = new Router();

// 路由
router.get("/", async (ctx) => {
  ctx.body = { msg: "Hello Koa" };
});

router.use("/api/user", users);

module.exports = router;
