const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const ejs = require("ejs");
const path = require("path");
app.use(bodyParser.json());

app.get("/health", (req, res) => {
  res.send("Server is Live and Running");
});

app.get("/", async(req, res, next) => {
    try {
        const filePath = path.join(__dirname, './view/index.ejs');
         ejs.renderFile(filePath, {shortUrl: 'https://short.url/1234567890', username: 'John Doe'}, (err, str) => {
            if (err) {
                return res.status(500).send('Error rendering template');
            }
          
         return  res.send(str);
        })
    } catch (error) {
        next(error);
    }
});

app.use((error, req, res, next) => {
    const message = error.message ? error.message : "Server Error Occured";
    const status = error.status ? error.status : 500;
    res.status(status).json({ success: false, message });
  });

const port = 5003;
app.listen(port, async () => {
  console.log(`server running on http://localhost:${port}`);
});
