const { DataTypes } = require("sequelize");

module.exports = function (sequelize) {
  return sequelize
    .define(
      "carts",
      {
        goods_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
          comment: "商品id",
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
          comment: "用户id",
        },
        number: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 1,
          comment: "商品数量",
        },
        selected: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true,
          comment: "是否选中",
        },
      },
      {
        tableName: "carts",
      }
    )
};
