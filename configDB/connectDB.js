const {default:mongoose} = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Failed to connect to DB", error);
    }
}

module.exports = { connectDB };