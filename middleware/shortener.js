const Shortener = require("../model/shortener.model");
const logger = require("../logger");
const compressUrl = async (originalUrl, next) => {
  try {
    const isShorted = await Shortener.findOne({ originalUrl });
    if (isShorted) {
      return isShorted.shortUrl;
    }else{
      const shortId = Math.random().toString(36).substring(2, 7);
      const shortUrl = `${process.env.BASE_URL}/${shortId}`;
      await Shortener.collection.insertOne({
        originalUrl,
        shortUrl: shortUrl,
      });
      return shortUrl
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { compressUrl };
