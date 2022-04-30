const Koa = require("koa");
const Router = require("koa-router");
const mongoose = require("mongoose");
var bodyParser = require('koa-bodyparser');

const users = require("./routes/api/user");

console.log(process.env.MONGODBUSER);

// 实例化koa
const app = new Koa();

app.use(bodyParser());

const router = new Router();

const userName = process.env.MONGODBUSER;
const password = process.env.MONGODBPASSWORD;
const mongodbUrl = process.env.MONGODBURI;


mongoose
  .connect(`mongodb+srv://${userName}:${password}@${mongodbUrl}`, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then((res) => {})
  .catch((err) => {
    console.log(err);
  });

/**
 * 连接成功
 */
mongoose.connection.on("connected", function () {
  console.log("连接成功");
});

/**
 * 连接异常
 */
mongoose.connection.on("error", function (err) {
  console.log("连接异常");
});

/**
 * 连接断开
 */
mongoose.connection.on("disconnected", function () {
  console.log("连接断开");
});

// 路由
router.get("/", async (ctx) => {
  ctx.body = { msg: "Hello Koa" };
});

router.use("/api/user", users);
// 配置路由
app.use(router.routes()).use(router.allowedMethods());

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server starten on http://locahost:${port}`);
});
