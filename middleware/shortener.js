const Shortener = require("../model/shortener.model");
const logger = require("../logger");
const compressUrl = async (originalUrl, next) => {
  try {
    const isShorted = await Shortener.findOne({ originalUrl });
    if (isShorted) {
      await client.set(`originalUrl0:${originalUrl}`, isShorted.shortUrl);
      return isShorted.shortUrl;
    }
    const shortId = Math.random().toString(36).substring(2, 7);
    const shortUrl = `${process.env.BASE_URL}/${shortId}`;
    const shortener = await Shortener.collection.insertOne({
      originalUrl,
      shortUrl: shortUrl,
    });
    if (!shortener) {
      logger.error("Value not inserted");
      throw new Error("Value not inserted");
    }

    return shortener.shortUrl;
  } catch (error) {
    next(error);
  }
};

module.exports = { compressUrl };
