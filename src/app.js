const Koa = require("koa");
const mongoose = require("mongoose");
const koaBody = require("koa-body");
const router = require("./routes/index");

// 实例化koa
const app = new Koa();

app.use(
  koaBody({
    multipart: true, // 支持文件上传
  })
);

const userName = process.env.MONGODB_USER;
const password = process.env.MONGODB_PWD;
const mongodbUrl = process.env.MONGODB_URI;

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
  console.log("mongo连接成功");
});

/**
 * 连接异常
 */
mongoose.connection.on("error", function (err) {
  console.log("mongo连接异常");
});

/**
 * 连接断开
 */
mongoose.connection.on("disconnected", function () {
  console.log("mongo连接断开");
});

// 配置路由
app.use(router.routes()).use(router.allowedMethods());

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server starten on http://locahost:${port}`);
});
