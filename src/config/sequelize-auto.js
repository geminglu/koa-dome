const SequelizeAuto = require("sequelize-auto");

const options = {
  host: "192.168.86.129",
  dialect: "mysql",
  directory: "models", // 指定输出 models 文件的目录
  port: "3306",
  additional: {
    timestamps: false,
  },
};
const auto = new SequelizeAuto("test", "root", "199698", options);

auto.run((err) => {
  if (err) throw err;
});
