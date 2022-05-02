const { DataTypes } = require("sequelize");
module.exports = function (sequelize) {
  return sequelize
    .define(
      "user",
      {
        name: {
          type: DataTypes.STRING,
          allowNull: true,
          unique: true,
          comment: "用户名",
        },
        email: {
          type: DataTypes.STRING,
          allowNull: true,
          unique: true,
          comment: "邮箱",
        },
        password: {
          type: DataTypes.CHAR(64),
          allowNull: true,
          comment: "密码",
        },
        avatar: {
          type: DataTypes.STRING,
          allowNull: true,
          comment: "头像",
        },
        role: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 1,
          comment: "角色，0：管理员，1：普通用户，3：游客",
        },
      },
      {
        tableName: "user",
      }
    );
};
