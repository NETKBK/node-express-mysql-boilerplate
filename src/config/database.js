/*
 * 数据库配置
 * */

const config = require("./config");

module.exports = {
  development: {
    username: config.dbUser,
    password: config.dbPass,
    database: config.dbName,
    host: config.dbHost,
    dialect: "mysql",
    port: config.port,
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
  test: {
    username: config.dbUser,
    password: config.dbPass,
    database: config.dbName,
    host: config.dbHost,
    dialect: "mysql",
    port: config.port,
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
  production: {
    username: config.dbUser,
    password: config.dbPass,
    database: config.dbName,
    host: config.dbHost,
    port: config.port,
    dialect: "mysql",
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
};
