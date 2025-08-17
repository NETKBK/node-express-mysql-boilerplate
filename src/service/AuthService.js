const bcrypt = require("bcryptjs");
const httpStatus = require("http-status");
const UserDao = require("../dao/UserDao");
const TokenDao = require("../dao/TokenDao");
const { tokenTypes } = require("../config/tokens");
const responseHandler = require("../helper/responseHandler");
const logger = require("../config/logger");
const RedisService = require("./RedisService");
/*
 * 认证服务类
 * 提供用户注册、登录、刷新令牌、注销、更改密码等功能
 */
class AuthService {
  /*
   * 在 AuthService 类里提前创建好一些“依赖对象”，后续方法就可以直接拿来用，而不用每次都 new。
   * 箭头函数的 this 是在定义时绑定的，始终指向类实例，不会因为调用方式变化而丢失。
   * */
  constructor() {
    /*
     * this指向的是调用该方法的对象
     * */
    this.userDao = new UserDao();
    this.tokenDao = new TokenDao();
    this.redisService = new RedisService();
  }

  /**
   * 创建用户
   * @param {String} email
   * @param {String} password
   * @returns {Promise<{response: {code: *, message: *, status: boolean}, statusCode: *}>}
   */
  loginWithEmailPassword = async (email, password) => {
    try {
      let message = "登录成功";
      let statusCode = httpStatus.OK;
      let user = await this.userDao.findByEmail(email);
      if (user == null) {
        return responseHandler.returnError(
          httpStatus.BAD_REQUEST,
          "无效电邮地址!"
        );
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      user = user.toJSON();
      delete user.password;

      if (!isPasswordValid) {
        statusCode = httpStatus.BAD_REQUEST;
        message = "错误的密码!";
        return responseHandler.returnError(statusCode, message);
      }

      return responseHandler.returnSuccess(statusCode, message, user);
    } catch (e) {
      logger.error(e);
      return responseHandler.returnError(
        httpStatus.BAD_GATEWAY,
        "出问题了！！"
      );
    }
  };

  logout = async (req, res) => {
    const refreshTokenDoc = await this.tokenDao.findOne({
      token: req.body.refresh_token,
      type: tokenTypes.REFRESH,
      blacklisted: false,
    });
    if (!refreshTokenDoc) {
      return false;
    }
    await this.tokenDao.remove({
      token: req.body.refresh_token,
      type: tokenTypes.REFRESH,
      blacklisted: false,
    });
    await this.tokenDao.remove({
      token: req.body.access_token,
      type: tokenTypes.ACCESS,
      blacklisted: false,
    });
    this.redisService.removeToken(req.body.access_token, "access_token");
    this.redisService.removeToken(req.body.refresh_token, "refresh_token");
    return true;
  };
}

module.exports = AuthService;
