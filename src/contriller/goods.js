const path = require("path");
const {
  createGoods,
  getGoodsInfo,
  updataGoods,
  removeMandatoryGoods,
  removeGoods,
  restoreGoods,
  queryGoods,
} = require("../service/goods");

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

  /**
   * 修改商品
   * @param {*} ctx
   * @param {*} next
   */
  async updataGoods(ctx, next) {
    const { id } = ctx.params;
    try {
      // 在创建之前先查询一下商品名称是否已经存在了
      if (!(await getGoodsInfo({ id }))) {
        ctx.status = 409;
        ctx.body = { message: `商品不存在` };
        return;
      }
      const res = await updataGoods(id, ctx.request.body);
      const result = await getGoodsInfo({ id });
      ctx.status = 200;
      ctx.body = { message: "修改成功", data: result };
    } catch (error) {
      console.log(error);
      ctx.status = 500;
      ctx.body = { message: "商品修改失败" };
      return;
    }
    await next();
  }

  /**
   * 删除商品(硬删除)
   * @param {*} ctx
   * @param {*} next
   */
  async hardDeleteGoods(ctx, next) {
    const { id } = ctx.params;
    try {
      const res = await removeMandatoryGoods(id);
      if (res) {
        ctx.status = 200;
        ctx.body = { message: "删除成功" };
        return;
      } else {
        ctx.status = 408;
        ctx.body = { message: "删除失败" };
      }
    } catch (error) {
      console.log(error);
      ctx.status = 500;
      ctx.body = { message: "商品删除失败" };
      return;
    }
    await next();
  }

  /**
   * 下架商品
   * @param {*} ctx
   * @param {*} next
   */
  async remove(ctx, next) {
    try {
      const res = await removeGoods(ctx.params.id);
      if (res) {
        ctx.status = 200;
        ctx.body = { message: "下架成功" };
        return;
      } else {
        ctx.status = 408;
        ctx.body = { message: "下架失败" };
      }
    } catch (error) {
      console.log("error", error);
      ctx.status = 500;
      ctx.body = { message: "下架失败" };
      return;
    }
    await next();
  }

  /**
   * 上架架商品
   * @param {*} ctx
   * @param {*} next
   */
  async restore(ctx, next) {
    try {
      const res = await restoreGoods(ctx.params.id);
      if (res) {
        ctx.status = 200;
        ctx.body = { message: "上架成功" };
      } else {
        ctx.status = 408;
        ctx.body = { message: "上架失败" };
        return;
      }
    } catch (error) {
      console.log("error", error);
      ctx.status = 500;
      ctx.body = { message: "上架失败" };
      return;
    }
    await next();
  }

  /**
   * 查询商品
   * @param {*} ctx
   * @param {*} next
   */
  async queryGoods(ctx, next) {
    const { pageNum = 1, pageSize = 10 } = ctx.request.query;
    try {
      const res = await queryGoods(pageNum, pageSize);
      ctx.status = 200;
      ctx.body = { data: res };
    } catch (error) {
      ctx.status = 500;
      ctx.body = { message: "查询失败" };
      return;
    }
    await next();
  }
}

module.exports = new Goods();
