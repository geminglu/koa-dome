const Router = require("koa-router");
// const User = require("../../models/user");
// const gravatar = require("gravatar");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");

// const { SECRET } = require("../../config/keys");
// const { USERNAME } = require("../../utils/regexp");
const router = new Router();

const { register, profile, login } = require("../contriller/user");

const routers = [
  {
    path: "/profile",
    mode: "get",
    contriller: profile,
  },
  {
    path: "/login",
    mode: "post",
    contriller: login,
  },
  {
    path: "/register",
    mode: "post",
    contriller: register,
  },
];

routers.forEach((item, index) => {
  router[item.mode](item.path, item.contriller);
});

module.exports = router.routes();
