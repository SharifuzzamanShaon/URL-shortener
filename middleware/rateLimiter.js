const { json } = require("express");
const client = require("../redisClient");
const rateLimitStorage = new Map();

const rateLimitMiddleware = async (req, res, next) => {
  const ip = req.headers["x-forwarded-for"] || `${req.ip}_${req.body.username}`; // user IP address
  const windowMs = 60 * 1000; // 1 minute window
  const limit = 10; // Max requests per window
  const currentTime = Date.now();
  if (!client.hget(`userIp:${ip}`, "count")) {
    rateLimitStorage.set(ip, { count: 1, timestamp: currentTime });
    client.hset(`userIp:${ip}`, "count", 1, "timestamp", currentTime);
  } else {
    // const userData = rateLimitStorage.get(ip);
    const userData = await client.hgetall(`userIp:${ip}`);
    // console.log(`User Data: ${JSON.parse(userData)}`);
    if (currentTime - parseInt(userData.timestamp) < windowMs) {
      await client.hincrby(`userIp:${ip}`, "count", 1);

      if (parseInt(userData.count) > limit) {
        return res
          .status(429)
          .json({ message: "Too many requests, please try again later." });
      }
    } else {
      rateLimitStorage.set(ip, { count: 1, timestamp: currentTime });
      client.hset(`userIp:${ip}`, "count", 1, "timestamp", currentTime);
    }
  }
  next();
};
module.exports = rateLimitMiddleware;
