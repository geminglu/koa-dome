const Router = require("koa-router");
const router = new Router({ prefix: "/api/carts" });
const { auth } = require("../middlewares/auth");
const { addCarts, getCarts, upCarts } = require("../contriller/carts");

// 加入购物车
router.post("/", auth, addCarts);

// 查询购物车列表
router.get("/", auth, getCarts);

// 更新购物车
router.patch("/:id", auth, upCarts);

module.exports = router;
