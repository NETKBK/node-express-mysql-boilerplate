const Redis = require("redis");
const { redis } = require("./config");

let url = `redis://${redis.host}:${redis.port}`;
if (redis.usePassword.toUpperCase() === "YES") {
  // redis://:password@host:port
  url = `redis://:${redis.password}@${redis.host}:${redis.port}`;
}

const client = Redis.createClient({
  url,
});

client.on("error", (err) => console.error("Redis连接端错误", err.message));

(async () => {
  await client.connect();
  console.log("Redis连接成功");
})();

module.exports = client;
