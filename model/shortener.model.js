const mongoose = require("mongoose");

const shortenerSchema = new mongoose.Schema({
    originalUrl: {
        type: String,
        required: true,
        unique: true
    },
    shortUrl: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Shortener = mongoose.model("Shortener", shortenerSchema); 

module.exports = Shortener;