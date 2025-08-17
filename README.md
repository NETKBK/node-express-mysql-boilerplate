# Node-Express + Sequelize ORM 项目模板

这是一个适用于企业级 REST API 或服务的项目模板，基于 Node.js、Express 和 Sequelize ORM，可连接 MySQL、PostgreSQL 或其他数据库。

运行此项目后，你将获得一个生产环境准备好的项目，支持验证、单元测试、Socket、Redis 等功能。

## 手动安装

## 克隆仓库：

```bash
git clone https://github.com/NETKBK/node-express-mysql-boilerplate.git
cd node-express-mysql-boilerplate
```

安装依赖

```bash
yarn install
```

## 配置环境变量

```bash
copy .env.example .env

# 打开 .env 文件，根据需要修改配置
```


## ⚡ 功能特点

ORM：使用 Sequelize 进行对象数据建模

数据库迁移与初始化数据：使用 Sequelize-CLI

认证与授权：使用 Passport

错误处理：集中式错误处理

数据验证：使用 Joi 对请求数据进行验证

日志记录：使用 Winston

单元测试：使用 Mocha

缓存：使用 Redis

双向通信：使用 Socket.io

定时任务调度：使用 Node-cron

依赖管理：使用 Yarn

环境变量管理：使用 dotenv 和 cross-env

跨域支持：使用 cors

Docker 支持

代码规范：使用 ESLint 和 Prettier


## 启动项目

启动项目: 开发环境

```bash
yarn dev
```

开发环境：生产环境

```bash
yarn start
```

运行测试

```bash
# 运行所有单元测试
yarn test

```

## ⚙️ 环境变量
环境变量在 .env 文件中配置，可根据需要修改。默认示例如下：

```bash
# 服务器环境
NODE_ENV=development
# 端口号
PORT=5000

# 数据库配置
DB_HOST=db-host
DB_USER=db-user
DB_PASS=db-pass
DB_NAME=db-name

# JWT 配置
JWT_SECRET=your-jwt-secret-key
# 访问令牌过期时间（分钟）
JWT_ACCESS_EXPIRATION_MINUTES=5
# 刷新令牌过期时间（天）
JWT_REFRESH_EXPIRATION_DAYS=30

# 日志配置
LOG_FOLDER=logs/
LOG_FILE=%DATE%-app-log.log
LOG_LEVEL=error

# Redis 配置
REDIS_HOST=redis-host
REDIS_PORT=6379
REDIS_USE_PASSWORD=no
REDIS_PASSWORD=your-password

```

## 🏗️ 项目结构

```
specs\                  # API 文档、接口说明、测试用例 (swagger, postman, etc.)
src\
 |-- config\            # 配置文件 (环境变量、常量、JWT 配置、DB 配置等)
 |-- controllers\       # 控制器层：接收请求(req)，调用 service 处理，返回响应(res)
 |-- dao\               # 数据访问层：封装数据库的 CRUD 操作
 |-- db\                # 数据库相关：迁移文件 (migrations)、初始化数据 (seeders)
 |-- models\            # 数据模型 (Sequelize 定义的表结构/实体类)
 |-- routes\            # 路由层：请求路径与 controller 绑定
 |-- services\          # 服务层：核心业务逻辑，调用 dao 或第三方服务
 |-- helper\            # 工具函数：加解密、生成 token、logger、分页工具等
 |-- validations\       # 参数校验 (Joi/express-validator schemas)
 |-- app.js             # Express 应用实例，挂载中间件和路由
 |-- cronJobs.js        # 定时任务 (node-cron, agenda, bull 等)
 |-- index.js           # 项目入口 (启动 app, 监听端口)
```

## 📝 许可证

[MIT](LICENSE)
