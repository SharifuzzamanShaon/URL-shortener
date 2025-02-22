const crypto = require("crypto");
const Shortener = require("../model/shortener.model");

const compressUrl = async (originalUrl) => {
  try {
    const shortId = Math.random().toString(36).substring(2, 7);
    // const shortener = await Shortener.collection.insertOne({ originalUrl, shortUrl: shortId });
    // if (!shortener) {
    //   throw new Error("Failed to compress URL");
    // }
    const shortUrlFull = `${process.env.BASE_URL}/${shortId}`;
    return shortUrlFull;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to compress URL", error);
  }
};

module.exports = { compressUrl };
