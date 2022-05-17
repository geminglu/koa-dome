const Router = require("koa-router");
const router = new Router({ prefix: "/api/address" });
const { auth } = require("../middlewares/auth");
const {
  addAddr,
  getAddr,
  getAddrDetails,
  upDateAddrDetails,
  deleteAddr,
  setDefaultAddr,
} = require("../contriller/addr.js");

// 添加收件地址
router.post("/", auth, addAddr);

// 获取收件地址
router.get("/", auth, getAddr);

// 获取收件地址详情
router.get("/:id", auth, getAddrDetails);

// 更新收件地址详情
router.put("/:id", auth, upDateAddrDetails);

// 删除收件地址
router.delete("/:id", auth, deleteAddr);

// 设置默认收件地址
router.patch("/:id", auth, setDefaultAddr);

module.exports = router;
