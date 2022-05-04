const { DataTypes } = require("sequelize");
module.exports = function (sequelize) {
  return sequelize.define(
    "goods",
    {
      goods_name: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        comment: "商品名称",
      },
      goods_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        comment: "商品价格",
      },
      goods_num: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: "库存数量",
      },
      goods_img: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: "商品图片url",
      },
    },
    {
      tableName: "goods",
      paranoid: true,
    }
  );
};
