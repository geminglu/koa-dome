const Router = require("koa-router");
const router = new Router();
const { register, profile, login } = require("../contriller/user");
const { crpyPassword, verifyLogin } = require("../middlewares/index")
const { auth } = require("../middlewares/auth")

router.post("/register", crpyPassword, register);
router.post("/login", verifyLogin, login);
router.get("/profile", auth, profile);

module.exports = router.routes();
