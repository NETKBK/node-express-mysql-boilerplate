/*
 * 这个文件的作用是 对用户相关接口的请求参数做校验，避免非法数据直接进入数据库或业务逻辑。
 * */

const Joi = require("joi"); // 参数校验库
const httpStatus = require("http-status"); // HTTP 状态码枚举
const ApiError = require("../helper/ApiError"); // 自定义错误类（包装错误信息）

class UserValidator {
  async userCreateValidator(req, res, next) {
    // 创建模式对象
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
      confirm_password: Joi.string().valid(Joi.ref("password")).required(),
      first_name: Joi.string(),
      last_name: Joi.string(),
    });

    // 模式的选择
    const options = {
      abortEarly: false, // 包括所有错误
      allowUnknown: true, // 忽略未知道具
      stripUnknown: true, // 移除未知道具
    };

    // 根据模式验证请求体
    const { error, value } = schema.validate(req.body, options);

    if (error) {
      // 失败时返回逗号分隔的错误
      const errorMessage = error.details
        .map((details) => {
          return details.message;
        })
        .join(", ");
      next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
    } else {
      // 成功时替换要求。具有验证值的主体，并触发下一个中间件功能
      req.body = value;
      return next();
    }
  }

  async userLoginValidator(req, res, next) {
    // 创建模式对象
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    });

    // 模式的选择
    const options = {
      abortEarly: false, // 包括所有错误
      allowUnknown: true, // 忽略未知道具
      stripUnknown: true, // remove unknown props
    };

    // 根据模式验证请求体
    const { error, value } = schema.validate(req.body, options);

    if (error) {
      // 失败时返回逗号分隔的错误
      const errorMessage = error.details
        .map((details) => {
          return details.message;
        })
        .join(", ");
      next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
    } else {
      // 成功时替换要求。具有验证值的主体，并触发下一个中间件功能
      req.body = value;
      return next();
    }
  }

  async checkEmailValidator(req, res, next) {
    // 创建模式对象
    const schema = Joi.object({
      email: Joi.string().email().required(),
    });

    // 模式的选择
    const options = {
      abortEarly: false, // include all errors
      allowUnknown: true, // ignore unknown props
      stripUnknown: true, // remove unknown props
    };

    // 根据模式验证请求体
    const { error, value } = schema.validate(req.body, options);

    if (error) {
      // 失败时返回逗号分隔的错误
      const errorMessage = error.details
        .map((details) => {
          return details.message;
        })
        .join(", ");
      next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
    } else {
      // 成功时替换要求。具有验证值的主体，并触发下一个中间件功能
      req.body = value;
      return next();
    }
  }

  async changePasswordValidator(req, res, next) {
    // create schema object
    const schema = Joi.object({
      old_password: Joi.string().required(),
      password: Joi.string().min(6).required(),
      confirm_password: Joi.string().min(6).required(),
    });

    // schema options
    const options = {
      abortEarly: false, // include all errors
      allowUnknown: true, // ignore unknown props
      stripUnknown: true, // remove unknown props
    };

    // validate request body against schema
    const { error, value } = schema.validate(req.body, options);

    if (error) {
      // on fail return comma separated errors
      const errorMessage = error.details
        .map((details) => {
          return details.message;
        })
        .join(", ");
      next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
    } else {
      // on success replace req.body with validated value and trigger next middleware function
      req.body = value;
      return next();
    }
  }
}

module.exports = UserValidator;
