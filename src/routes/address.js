const Router = require("koa-router");
const router = new Router({ prefix: "/api/address" });
const { auth } = require("../middlewares/auth");
const { addAddr } = require("../contriller/addr.js");

// 添加收件地址
router.post("/", auth, addAddr);

module.exports = router;
