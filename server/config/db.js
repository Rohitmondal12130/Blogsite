const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongodb:27017/mydatabase';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`MongoDB Connection Error: ${err.message}`);
    console.error("Ensure that your MongoDB service is running and the URI is correct.");
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
