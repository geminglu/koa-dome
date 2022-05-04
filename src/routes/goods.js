const Router = require("koa-router");
const router = new Router({ prefix: "/api/goods" });
const {
  upload,
  addGoods,
  updataGoods,
  removeGoods,
} = require("../contriller/goods");
const { auth, hadAdmin } = require("../middlewares/auth");

// 上传文件
router.post("/upload", auth, hadAdmin, upload);

// 添加商品
router.post("/", auth, addGoods);

// 修改商品
router.put("/:id", auth, updataGoods);

// 删除商品
router.delete("/:id", auth, hadAdmin, removeGoods);

module.exports = router;
