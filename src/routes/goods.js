const Router = require("koa-router");
const router = new Router({ prefix: "/api/goods" });
const { upload } = require("../contriller/goods");
const { auth, hadAdmin } = require("../middlewares/auth");

router.post("/upload", auth, hadAdmin, upload);

module.exports = router;
