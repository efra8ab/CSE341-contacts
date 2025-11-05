// db/connect.js
const dotenv = require('dotenv')
const { MongoClient } = require("mongodb");

let _db; // internal variable to hold the connection

// connect once, reuse everywhere
const connectToDb = (callback) => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("Missing MONGODB_URI in environment variables");
  }

  MongoClient.connect(uri)
    .then((client) => {
      console.log("✅ Connected to MongoDB");
      _db = client.db(process.env.DB_NAME);
      callback();
    })
    .catch((err) => {
      console.error("❌ MongoDB connection failed:", err);
      callback(err);
    });
};

// access the active database connection
const getDb = () => {
  if (!_db) {
    throw new Error("Database not connected. Call connectToDb first.");
  }
  return _db;
};

module.exports = { connectToDb, getDb };
