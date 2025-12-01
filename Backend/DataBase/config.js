const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const MONGO_URI = process.env.MONGODB_URI;

function connectDB() {
    if (!MONGO_URI) {
        console.error("ERROR: MONGODB_URI is missing");
        process.exit(1);
    }

    mongoose
        .connect(MONGO_URI)
        .then((conn) => {
            console.log("Connected to MongoDB");
            console.log(`Host: ${conn.connection.host}`);
        })
        .catch((err) => {
            console.error("MongoDB connection error:", err.message);
            process.exit(1);
        });
}

module.exports = connectDB;
