const { DataTypes } = require("sequelize");

module.exports = function (sequelize) {
  return sequelize.define(
    "addr",
    {
      user_id: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "用户id",
      },
      consignee: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "收货人姓名",
      },
      phone: {
        type: DataTypes.CHAR(11),
        allowNull: false,
        comment: "收货人手机号",
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "收货人的详细地址",
      },
      is_default: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment: "是否为默认地址",
      },
    },
    {
      tableName: "addr",
    }
  );
};
