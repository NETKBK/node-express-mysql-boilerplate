const app = require("./app");
const config = require("./config/config");

require("./cronJobs");
// eslint-disable-next-line import/order
const http = require("http");
// socket initialization
const server = http.createServer(app);
// eslint-disable-next-line import/order
const io = require("socket.io")(server, { cors: { origin: "*" } });

global.io = io;
require("./config/rootSocket")(io);

server.listen(config.port, () => {
  console.log(`服务已启动：http://127.0.0.1:${config.port}`);
});
