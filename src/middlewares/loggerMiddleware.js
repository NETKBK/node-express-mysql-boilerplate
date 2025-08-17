/*
 * 请求日志中间件
 * */
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");
dayjs.extend(utc);
dayjs.extend(timezone);

class LoggerMiddleware {
  // 请求日志
  logRequests = (req, res, next) => {
    const start = Date.now();

    res.on("finish", () => {
      const duration = Date.now() - start;
      const time = dayjs().tz("Asia/Shanghai").format("YYYY-MM-DD HH:mm:ss");

      const method = req.method;
      const url = req.originalUrl;
      const status = res.statusCode;

      let log = `[${time}] ${method} ${url} ${status} - ${duration}ms`;

      // 打印查询参数（GET请求）
      if (method === "GET" && Object.keys(req.query).length) {
        log += ` | query: ${JSON.stringify(req.query)}`;
      }

      // 打印请求体（POST/PUT/PATCH/DELETE）
      if (
        ["POST", "PUT", "PATCH", "DELETE"].includes(method) &&
        req.body &&
        Object.keys(req.body).length
      ) {
        log += ` | body: ${JSON.stringify(req.body)}`;
      }

      console.log(log);
    });

    next();
  };
}

module.exports = new LoggerMiddleware();
