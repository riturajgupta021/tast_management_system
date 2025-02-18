const redis = require("redis");

const client = redis.createClient({
  socket: {
    host: process.env.REDIS_HOST, 
    port: process.env.REDIS_PORT, 
  },
  password: process.env.REDIS_PASSWORD
});

client.on("connect", () => {
  console.log("✅ Connected to Redis Cloud");
});

client.on("error", (err) => {
  console.error("❌ Redis Error:", err.message);
});

client.connect();

module.exports = client;
