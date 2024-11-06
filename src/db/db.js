const mongoose = require("mongoose");
const URI = "mongodb://127.0.0.1:27017";
const DB_NAME = "demo";
const connectDB = async () => {
  try {
    const ConeectionINstance = await mongoose.connect(`${URI}/${DB_NAME}`);
    console.log(`MONGODB connected: ${ConeectionINstance.connection.host}`);
  } catch (error) {
    console.log("MONGODB connection error -> ", error);
    process.exit(1);
  }
};
module.exports = connectDB;
