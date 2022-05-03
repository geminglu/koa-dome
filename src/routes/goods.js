const Router = require("koa-router");
const router = new Router({ prefix: "/api/goods" });
const { upload, addGoods, updataGoods } = require("../contriller/goods");
const { auth, hadAdmin } = require("../middlewares/auth");

router.post("/upload", auth, hadAdmin, upload);

router.post("/", auth, addGoods);

router.put("/:id", auth, updataGoods);

module.exports = router;
