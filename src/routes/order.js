const Router = require("koa-router");
const router = new Router({ prefix: "/api/order" });
const { auth } = require("../middlewares/auth");
const { createOrder } = require("../contriller/order.js");

// 添加收件地址
router.post("/", auth, createOrder);

module.exports = router;
