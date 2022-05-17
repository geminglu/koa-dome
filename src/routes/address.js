const Router = require("koa-router");
const router = new Router({ prefix: "/api/address" });
const { auth } = require("../middlewares/auth");
const { addAddr, getAddr } = require("../contriller/addr.js");

// 添加收件地址
router.post("/", auth, addAddr);

// 获取收件地址
router.get("/", auth, getAddr);

module.exports = router;
