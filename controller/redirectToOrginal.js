const Shortener = require("../model/shortener.model");

const redirectToOrginal = async (req, res) => {
  try {
    const { shortUrl } = req.params;
    const getUrlFor = `${process.env.BASE_URL}/${shortUrl}`;
    const shortener = await Shortener.findOne({ shortUrl: `${getUrlFor}` });
    if (!shortener) {
      return res.status(404).json({ message: "Short URL not found" });
    }
    res.redirect(shortener.originalUrl);
  } catch (error) {
    throw new Error("Failed to redirect to original URL");
  }
};

module.exports = { redirectToOrginal };
