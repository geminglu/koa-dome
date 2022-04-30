module.exports = {
  /**
   * 验证用户名
   * 3到16为中文数字字母_-组合必须以中文或字母开头
   */
  USERNAME: /^[\u2E80-\u9FFFA-Za-z]{1}[\u2E80-\u9FFFA-z0-9_-]{2,15}$/,
};
