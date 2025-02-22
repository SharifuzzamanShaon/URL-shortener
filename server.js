const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const ejs = require("ejs");
const path = require("path");
const router = require("./router/index");
const { connectDB } = require("./configDB/connectDB");
const { compressUrl } = require("./middleware/shortener");
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

app.post("/", async (req, res) => {
  try {
    const { originalUrl } = req.body;
    const shortUrl = await compressUrl(originalUrl);
    res.render("index", { shortUrl, originalUrl });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
    // res.render("index", { shortUrl: null, originalUrl: "", error });
  }
});

app.use("/", router);


app.use((error, req, res, next) => {
  const message = error.message ? error.message : "Server Error Occured";
  const status = error.status ? error.status : 500;
  res.status(status).json({ success: false, message });
});

const port = 5003;
app.listen(port, async () => {
  console.log(`server running on http://localhost:${port}`);
  await connectDB();
});
