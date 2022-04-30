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
在`scripts` 里面添加启动脚本 dotenv后面没有参数表示默认使用`.env`的配置文件，参数`e`指定文件