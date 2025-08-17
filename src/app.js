const express = require("express");
const cors = require("cors");
const passport = require("passport");
const httpStatus = require("http-status");
const routes = require("./route");
const { jwtStrategy } = require("./config/passport");
const loggerMiddleware = require("./middlewares/loggerMiddleware");
const { errorConverter, errorHandler } = require("./middlewares/error");
const ApiError = require("./helper/ApiError");

process.env.PWD = process.cwd();

const app = express();

// enable cors
app.use(cors());
app.options("*", cors());

app.use(express.static(`${process.env.PWD}/public`));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// jwt身份验证
app.use(passport.initialize(undefined));
passport.use("jwt", jwtStrategy);

app.get("/", async (req, res) => {
  res.status(200).send("恭喜你!API正在工作！");
});

// 路由前调用
app.use(loggerMiddleware.logRequests);

/*
 * 路由配置
 * */
app.use("/api/v1", routes);

// 对任何未知的API请求发回404错误
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "404 Not found"));
});

// 如果需要，将error转换为ApiError
app.use(errorConverter);

// 处理错误
app.use(errorHandler);
const db = require("./models");

// 如果要同步数据库模型，请取消这一行的注释
// db.sequelize.sync();

module.exports = app;
