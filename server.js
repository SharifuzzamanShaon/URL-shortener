const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const router = require("./router/index");
const { connectDB } = require("./configDB/connectDB");
const { compressUrl } = require("./middleware/shortener");
const logger = require("./logger");
const rateLimitMiddleware = require("./middleware/rateLimiter");
require("dotenv").config();
app.use(bodyParser.json());

app.get("/health", (req, res) => {
  res.send("Server is Live and Running");
});

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view"));

app.get("/", (req, res) => {
  res.render("index", { shortUrl: null, originalUrl: "" });
});

app.post("/", rateLimitMiddleware, async (req, res, next) => {
  try {
    const { originalUrl } = req.body;
    const shortUrl = await compressUrl(originalUrl, next);
    logger.info(`Short URL: ${shortUrl}`);
    return res.render("index", { shortUrl, originalUrl });
  } catch (error) {
    next(error);
    logger.error(`Error: ${error}`);
  }
});

app.use("/", router);

app.use((error, req, res, next) => {
  const message = error.message ? error.message : "Server Error Occured";
  const status = error.status ? error.status : 500;
 return res.render("error", {goBack : process.env.BASE_URL || "/", message, status})
});

const port = 5003;
app.listen(port, '0.0.0.0', async () => {
  console.log(`server running on http://0.0.0.0:${port}`);
  logger.info(`server running on http://0.0.0.0:${port}`);
  await connectDB();
});

