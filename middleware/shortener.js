const crypto = require("crypto");
const Shortener = require("../model/shortener.model");
const generateShortUrl = () => {
  return crypto.randomBytes(2).toString("hex");
};

const compressUrl = async (originalUrl) => {
  try {
    //   const shortUrl = generateShortUrl();
    const shortId = Math.random().toString(36).substring(2, 7);
    const shortener = new Shortener({ originalUrl, shortUrl: shortId });
    await shortener.save();
    if (!shortener) {
      throw new Error("Failed to compress URL");
    }
    const shortUrlFull = `${process.env.BASE_URL}/${shortId}`;
    return shortUrlFull;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to compress URL", error);
  }
};

module.exports = { generateShortUrl, compressUrl };
