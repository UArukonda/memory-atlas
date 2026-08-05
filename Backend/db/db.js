const mongoose = require("mongoose");

const connectDB = async (connectionString) => {
  try {
    await mongoose.connect(connectionString);
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
