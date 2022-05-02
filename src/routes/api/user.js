// const Router = require("koa-router");
// const User = require("../../models/user");
// const gravatar = require("gravatar");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");

// const { SECRET } = require("../../config/keys");
// const { USERNAME } = require("../../utils/regexp");

// const router = new Router();

// /**
//  * @router POST api/user/
//  * @description 注册接口
//  * @access 接口是公开的
//  */
// router.post("/register", async (ctx) => {
//   const { email, name, password } = ctx.request.body;
//   if (!USERNAME.test(name)) {
//     ctx.status = 500;
//     ctx.body = { success: false, message: "用户名不符合规范" };
//     return;
//   }
//   try {
//     // 在注册之前项查询一下邮箱是个存在
//     const findResult = await User.findOne({ email });
//     if (findResult) {
//       ctx.status = 500;
//       ctx.body = { success: false, message: "邮箱已经被占用了" };
//       return;
//     }
//     //gravatar的使用模板
//     //pg是一种图片格式，网站中还有g，r，x三种格式
//     //404是没有上传或者注册时会报错，可以改成mm这样的话就会使用默认的头像
//     const avatar = gravatar.url(email, { s: "200", r: "pg", d: "mm" });
//     const newUser = new User({
//       name,
//       email,
//       password,
//       avatar,
//     });
//     var result = await newUser.save();
//     ctx.status = 200;
//     ctx.body = { success: true, message: result };
//   } catch (error) {
//     ctx.status = 404;
//     ctx.body = {
//       success: false,
//       message: error.message,
//     };
//   }
// });

// /**
//  * @router POST api/user/
//  * @description 登录接口
//  * @access 接口是公开的
//  */
// router.post("/login", async (ctx) => {
//   const { email, password } = ctx.request.body;
//   if (!(email && password)) {
//     ctx.status = 404;
//     ctx.body = {
//       success: false,
//       message: "邮箱和密码不能为空",
//     };
//     return;
//   }
//   const findResult = await User.findOne({ email });
//   if (!findResult) {
//     ctx.status = 404;
//     ctx.body = {
//       success: false,
//       message: "用户不存在",
//     };
//     return;
//   }

//   // 验证密码
//   const comparePwd = bcrypt.compareSync(password, findResult.password);
//   if (!comparePwd) {
//     ctx.status = 400;
//     ctx.body = {
//       success: false,
//       message: "密码错误",
//     };
//     return;
//   }

//   const token = jwt.sign({ id: findResult._id }, SECRET, {
//     expiresIn: 3600,
//   });
//   ctx.status = 200;
//   // 给浏览器设置cookies
//   ctx.cookies.set("token", token, {
//     path: "/",
//     expires: new Date(Date.now() + 2592000000), // 有效期
//     httpOnly: true, // document.cookie不可读
//   });
//   ctx.body = {
//     success: true,
//     status: 2000,
//     token: token,
//   };
// });

// /**
//  * @router GET api/users/profile
//  * @description 获取个人信息
//  * @access 接口需要授权
//  */
// router.get("/profile", async (ctx) => {
//   const cookies = ctx.cookies.get("token");

//   try {
//     const token = jwt.verify(cookies, SECRET);
//     const result = await User.findOne({ _id: token.id });
//     ctx.body = {
//       success: true,
//       status: 2000,
//       data: {
//         name: result.name,
//         email: result.email,
//         avatar: result.avatar,
//         date: result.date,
//       },
//     };
//   } catch (error) {
//     ctx.status = 401;
//     ctx.body = {
//       message: error.message,
//     };
//   }
// });

// module.exports = router.routes();

// ============================上面的方法是对mongoose的操作============================================