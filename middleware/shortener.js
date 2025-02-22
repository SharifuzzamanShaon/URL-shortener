const crypto = require("crypto");
const Shortener = require("../model/shortener.model");
const generateShortUrl = () => {
  return crypto.randomBytes(3).toString("hex");
};

const compressUrl = async (originalUrl) => {
  try {
    const shortUrl = generateShortUrl();
    const shortener = new Shortener({ originalUrl, shortUrl });
    await shortener.save();
    const shortUrlFull = `${process.env.BASE_URL}/${shortUrl}`;
    return shortUrlFull;
  } catch (error) {
    throw new Error("Failed to compress URL");
  }
};

module.exports = { generateShortUrl, compressUrl };
