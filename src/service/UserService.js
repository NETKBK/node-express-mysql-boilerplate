const httpStatus = require("http-status");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const UserDao = require("../dao/UserDao");
const responseHandler = require("../helper/responseHandler");
const logger = require("../config/logger");
const { userConstant } = require("../config/constant");

class UserService {
  constructor() {
    this.userDao = new UserDao();
  }

  /**
   * 创建用户
   * @param {Object} userBody
   * @returns {Object}
   */
  createUser = async (userBody) => {
    try {
      let message = "成功注册帐号！请确认您的邮箱.";
      if (await this.userDao.isEmailExists(userBody.email)) {
        return responseHandler.returnError(
          httpStatus.BAD_REQUEST,
          "邮件已被占用"
        );
      }
      const uuid = uuidv4();
      userBody.email = userBody.email.toLowerCase();
      userBody.password = bcrypt.hashSync(userBody.password, 8);
      userBody.uuid = uuid;
      userBody.status = userConstant.STATUS_ACTIVE;
      userBody.email_verified = userConstant.EMAIL_VERIFIED_FALSE;

      let userData = await this.userDao.create(userBody);

      if (!userData) {
        message = "注册失败!请重试。";
        return responseHandler.returnError(httpStatus.BAD_REQUEST, message);
      }

      userData = userData.toJSON();
      delete userData.password;

      return responseHandler.returnSuccess(
        httpStatus.CREATED,
        message,
        userData
      );
    } catch (e) {
      logger.error(e);
      return responseHandler.returnError(
        httpStatus.BAD_REQUEST,
        "出了什么问题!"
      );
    }
  };

  /**
   * 获取用户
   * @param {String} email
   * @returns {Object}
   */

  isEmailExists = async (email) => {
    const message = "电子邮件发现!";
    if (!(await this.userDao.isEmailExists(email))) {
      return responseHandler.returnError(
        httpStatus.BAD_REQUEST,
        "没有找到电子邮件！！"
      );
    }
    return responseHandler.returnSuccess(httpStatus.OK, message);
  };

  getUserByUuid = async (uuid) => {
    return this.userDao.findOneByWhere({ uuid });
  };

  changePassword = async (data, uuid) => {
    let message = "密码已成功更改";
    let statusCode = httpStatus.OK;
    let user = await this.userDao.findOneByWhere({ uuid });

    if (!user) {
      return responseHandler.returnError(httpStatus.NOT_FOUND, "用户未找到!");
    }

    if (data.password !== data.confirm_password) {
      return responseHandler.returnError(
        httpStatus.BAD_REQUEST,
        "确认密码不匹配"
      );
    }

    const isPasswordValid = await bcrypt.compare(
      data.old_password,
      user.password
    );
    user = user.toJSON();
    delete user.password;
    if (!isPasswordValid) {
      statusCode = httpStatus.BAD_REQUEST;
      message = "旧密码错误!";
      return responseHandler.returnError(statusCode, message);
    }
    const updateUser = await this.userDao.updateWhere(
      { password: bcrypt.hashSync(data.password, 8) },
      { uuid }
    );

    if (updateUser) {
      return responseHandler.returnSuccess(
        httpStatus.OK,
        "密码已成功更新!",
        {}
      );
    }

    return responseHandler.returnError(httpStatus.BAD_REQUEST, "密码更新失败!");
  };
}

module.exports = UserService;
