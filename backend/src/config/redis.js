const { createClient } = require("redis");
require("dotenv").config();

console.log(process.env.REDIS_PASS);

const redisClient = createClient({
  username: "default",
  password: "VdvdBT676A7w9Hf6hu8yCvZNhWN1McoI",
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
