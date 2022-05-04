const Router = require("koa-router");
const router = new Router({ prefix: "/api/goods" });
const {
  upload,
  addGoods,
  updataGoods,
  remove,
  hardDeleteGoods,
  restore,
  queryGoods
} = require("../contriller/goods");
const { auth, hadAdmin } = require("../middlewares/auth");

// 上传文件
router.post("/upload", auth, hadAdmin, upload);

// 添加商品
router.post("/", auth, addGoods);

// 修改商品
router.put("/:id", auth, updataGoods);

// 删除商品
router.delete("/:id", auth, hadAdmin, hardDeleteGoods);

// 下架商品
router.post("/:id/off", auth, hadAdmin, remove);

// 上架商品
router.post("/:id/on", auth, hadAdmin, restore);


// 查询商品
router.get("/", queryGoods);

module.exports = router;
