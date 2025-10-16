import mongoose from "mongoose";

let isConnected = false; 

const connectToDatabase = async () => {
  if (isConnected) {
    return mongoose.connection;
  }

  if (mongoose.connection.readyState >= 1) {
    isConnected = true;
    return mongoose.connection;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI);
    isConnected = db.connections[0].readyState === 1;
    console.log("Connected to MongoDB");
    return db;
  } catch (error) {
    console.error(" Error connecting to MongoDB:", error.message);
    throw new Error("Database connection failed");
  }
};

export default connectToDatabase;
