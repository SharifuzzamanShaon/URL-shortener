const {Redis} = require("ioredis");

const client = new Redis(process.env.REDIS_URL || "redis://redis:6379")

module.exports = client;