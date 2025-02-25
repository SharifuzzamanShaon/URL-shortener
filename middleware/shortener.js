const crypto = require("crypto");
const Shortener = require("../model/shortener.model");
const logger = require("../logger");
const client = require("../redisClient");
const compressUrl = async (originalUrl, next) => {
  try {
    const shortId = Math.random().toString(36).substring(2, 7);
    const shortener = await Shortener.collection.insertOne({ originalUrl, shortUrl: shortId });
    if (!shortener) {
      logger.error("Value not inserted");
      throw new Error("Value not inserted");
    }
    const shortUrlFull = `${process.env.BASE_URL}/${shortId}`;
    await client.set(`originalUrl0:${originalUrl}`, shortUrlFull);
    return shortUrlFull;
  } catch (error) {
    next(error);
  }
};

module.exports = { compressUrl };
