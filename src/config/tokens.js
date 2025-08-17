const tokenTypes = {
  ACCESS: "access", // 访问令牌 (短期有效，用于请求接口时认证)
  REFRESH: "refresh", // 刷新令牌 (长期有效，用于刷新获取新的 access token)
  RESET_PASSWORD: "resetPassword", // 重置密码令牌 (通常通过邮件/短信发送)
  VERIFY_EMAIL: "verifyEmail", // 验证邮箱令牌 (用于注册或修改邮箱时验证)
};

module.exports = {
  tokenTypes,
};
