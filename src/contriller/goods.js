const path = require("path");
const { createGoods, getGoodsInfo } = require("../service/goods");

class Goods {
  /**
   * 上传图片
   * @param {*} ctx
   * @param {*} next
   */
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

  /**
   * 创建商品
   * @param {*} ctx
   * @param {*} next
   */
  async addGoods(ctx, next) {
    const { goods_name, goods_price, goods_num, goods_img } = ctx.request.body;
    try {
      // 在创建之前先查询一下商品名称是否已经存在了
      if (await getGoodsInfo({ goods_name })) {
        ctx.status = 409;
        ctx.body = { message: `商品名称'${goods_name}'已经存在` };
        return;
      }
      const res = await createGoods({
        goods_name,
        goods_price,
        goods_num,
        goods_img,
      });
      ctx.status = 200;
      ctx.body = { message: "创建成功", data: res };
    } catch (error) {
      console.log(error);
      ctx.status = 500;
      ctx.body = { message: "商品添加失败" };
      return;
    }
    await next();
  }
}

module.exports = new Goods();
