const Router = require("koa-router");
const router = new Router({ prefix: "/api" });
const { register, profile, login } = require("../contriller/user");
const {
  validRequired,
  crpyPassword,
  verifyLogin,
} = require("../middlewares/index");
const { auth } = require("../middlewares/auth");

router.post("/register", validRequired, crpyPassword, register);

router.post("/login", verifyLogin, login);

router.get("/profile", auth, profile);

module.exports = router;
