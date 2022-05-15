const { Sequelize, DataTypes } = require("sequelize");
const fs = require("fs");

const { MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PWD, MYSQL_DB } = process.env;
const seq = new Sequelize(MYSQL_DB, MYSQL_USER, MYSQL_PWD, {
  host: MYSQL_HOST,
  dialect: "mysql",
  timezone: "+08:00",
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
