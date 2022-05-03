module.exports = {
  userFormateError: {
    status: 400,
    code: "1001",
    message: "用户名或密码为空",
  },
  userAlreadyExited: {
    status: 409,
    code: "1002",
    message: "用户已经存在",
  },
  userRegisterError: {
    status: 400,
    code: "1003",
    message: "用户注册错误",
  },
  userDoesNotExist: {
    status: 400,
    code: "1004",
    message: "用户不存在",
  },
  userLoginError: {
    status: 400,
    code: "1005",
    message: "用户登录失败",
  },
  invalidPassword: {
    status: 400,
    code: "1006",
    message: "密码不匹配",
  },
  tokenExpiredError: {
    status: 401,
    code: "1101",
    message: "token已过期",
    result: "",
  },
  invalidToken: {
    status: 401,
    code: "1102",
    message: "无效的token",
  },
  hasNotAdminPermission: {
    status: 403,
    code: "1103",
    message: "没有管理员权限",
    result: "",
  },
  fileUploadError: {
    status: 400,
    code: "1201",
    message: "商品图片上传失败",
  },
  unSupportedFileType: {
    code: "1202",
    message: "不支持的文件格式",
  },
  goodsFormatError: {
    status: 400,
    code: "1203",
    message: "商品参数格式错误",
  },
  publishGoodsError: {
    status: 400,
    code: "1204",
    message: "发布商品失败",
    result: "",
  },
  invalidGoodsID: {
    status: 400,
    code: "1205",
    message: "无效的商品id",
  },
  cartFormatError: {
    status: 400,
    code: "1301",
    message: "购物车数据格式错误",
  },
  addrFormatError: {
    status: 400,
    code: "1401",
    message: "地址数据格式错误",
  },
  orderFormatError: {
    status: 400,
    code: "1501",
    message: "订单数据格式错误",
  },
};
