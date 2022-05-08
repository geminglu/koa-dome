## 设置环境变量

### 安装

```bash
npm install dotenv-cli -D
```

### 使用

```json
"scripts": {
  "start": "dotenv nodemon ./src/app.js",
  "start:uat": "dotenv -e .env.uat nodemon ./src/app.js"
},
```

在`scripts` 里面添加启动脚本 dotenv 后面没有参数表示默认使用`.env`的配置文件，参数`e`指定文件

## 解析 body

### 安装中间件

```bash
yarn add koa-body
```

### 使用中间件

```js
const koaBody = require("koa-body");

app.use(
  koaBody({
    multipart: true, // 支持文件上传
  })
);
```

## 数据库的操作

## 安装

```bash
yarn add  mysql2 sequelize
```

## 创建模型

```javascript
const { DataTypes } = require("sequelize");
module.exports = function (sequelize) {
  return sequelize.define(
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

```
