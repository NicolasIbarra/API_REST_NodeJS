const mongoose = require("mongoose");

/**
 * The commented lines are useful in case of having a certain DB for testing only.
 * The same thing can be done for MySQL database.
 */
// const NODE_ENV = process.env.NODE_ENV;

const connectMongoDB = async () => {
  // const DB_URI = (process.env.NODE_ENV === "test") ? process.env.DB_URI_TEST : process.env.DB_URI;
  const DB_URI = process.env.DB_URI;
  try {
    await mongoose.connect(DB_URI);
    console.log("**** SUCCESSFUL CONNECTION TO MONGO ****");
  } catch {
    console.log("**** UNSUCCESSFUL CONNECTION TO MONGO ****");
  }
};

module.exports = connectMongoDB;
