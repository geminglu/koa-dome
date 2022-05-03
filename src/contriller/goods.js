const path = require("path");

class Goods {
  async upload(ctx, next) {
    const { file } = ctx.request.files;
    ctx.status = 200;
    ctx.body = {
      message: "上传图片成功",
      data: {
        imgUrl: path.basename(file.filepath),
      },
    };
    await next();
  }
}

module.exports = new Goods();
