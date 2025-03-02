const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const ejs = require("ejs");
const path = require("path");
const router = require("./router/index");
const { connectDB } = require("./configDB/connectDB");
const { compressUrl } = require("./middleware/shortener");
const logger = require("./logger");
const client = require("./redisClient");
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
  logger.info("Index page rendered");
});

app.post("/", async (req, res, next) => {
  try {
    const { originalUrl } = req.body;
    const shortUrl = await compressUrl(originalUrl, next);
    logger.info(`Short URL: ${shortUrl}`);
    res.render("index", { shortUrl, originalUrl });
  } catch (error) {
    next(error);
    logger.error(`Error: ${error}`);
  }
});

app.use("/", router);

app.get("/testRedis", async (req, res) => {
  await client.set("student:1", JSON.stringify({name: "John", age: 20}));
  const result = await client.get("student:1");
  res.json({ result });
  console.log("test");
});





app.use((error, req, res, next) => {
  const message = error.message ? error.message : "Server Error Occured";
  const status = error.status ? error.status : 500;
  res.status(status).json({ success: false, message });
});

const port = 5003;
app.listen(port, async () => {
  console.log(`server running on http://localhost:${port}`);
  logger.info(`server running on http://localhost:${port}`);
  await connectDB();
});
