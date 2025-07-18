const {default:mongoose} = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || "mongodb+srv://shaon123:shaon123@urls.58i8q.mongodb.net/?retryWrites=true&w=majority&appName=urls");
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Failed to connect to DB", error);
    }
}

module.exports = { connectDB };