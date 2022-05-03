const Router = require("koa-router");
const router = new Router({ prefix: "/api/goods" });
const { upload, addGoods } = require("../contriller/goods");
const { auth, hadAdmin } = require("../middlewares/auth");

router.post("/upload", auth, hadAdmin, upload);

router.post("/createGoods", auth, addGoods);

module.exports = router;
