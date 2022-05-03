const Router = require("koa-router");
const fs = require("fs");

const router = new Router();

// 路由
router.get("/", async (ctx) => {
  ctx.body = { msg: "Hello Koa" };
});

const files = fs.readdirSync(__dirname).filter((f) => {
  return f.endsWith(".js") && f !== "index.js";
});

files.forEach((f) => {
  router.use(require("./" + f).routes());
});

module.exports = router;
