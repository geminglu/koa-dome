const { Sequelize, DataTypes } = require("sequelize");
const fs = require("fs");

const { MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PWD, MYSQL_DB } = process.env;
const seq = new Sequelize(MYSQL_DB, MYSQL_USER, MYSQL_PWD, {
  host: MYSQL_HOST,
  dialect: "mysql",
});

seq
  .authenticate()
  .then((res) => {
    console.log("mysql连接成功", res);
  })
  .catch((error) => {
    console.log("mysql", error);
  });

const files = fs.readdirSync(__dirname + "/models");
const jsFiles = files.filter((f) => {
  return f.endsWith(".js");
}, files);

module.exports = { seq };

for (const f of jsFiles) {
  const name = f.substring(0, f.length - 3);
  module.exports[name] = require(__dirname + "/models/" + f)(seq);
}

// const user = seq.define(
//   "user",
//   {
//     // id会被sequelize自动创建
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//       comment: "用户名，唯一不能为空",
//     },
//     email: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//       comment: "邮箱，唯一不能为空",
//     },
//     password: {
//       type: DataTypes.CHAR(64),
//       allowNull: false,
//       comment: "密码",
//     },
//     is_admin: {
//       type: DataTypes.NUMBER,
//       allowNull: false,
//       defaultValue: 0,
//       comment: "是否是管理员，0：不是；1是",
//     },
//     avater: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       comment: "用户头像",
//     },
//   },
//   {
//     freezeTableName: true,
//   }
// );
