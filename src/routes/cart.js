const Router = require("koa-router");
const router = new Router({ prefix: "/api/carts" });
const { auth } = require("../middlewares/auth");
const { addCarts } = require("../contriller/carts");

// 加入购物车
router.post("/", auth, addCarts);

module.exports = router;
