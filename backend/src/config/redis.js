const { createClient } = require("redis");
require("dotenv").config();

const redisClient = createClient({
  username: "default",
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: "reading-wave-cabbage-26706.db.redis.io",
    port: 15690,
  },
});

module.exports = redisClient;

// client.on("error", (err) => console.log("Redis Client Error", err));

// await client.connect();

// await client.set("foo", "bar");
// const result = await client.get("foo");
// console.log(result); // >>> bar
