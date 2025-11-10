import app from "./app.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ quiet: true });

mongoose.set({ strictQuery: true });

// ✅ Single mongoose connection
let isConnected = false;

async function connectDB() {
  if (isConnected) return;
  try {
    await mongoose.connect(process.env.DATABASE);
    isConnected = true;
    console.log("MongoDB connected");
  } catch (err) {
    console.log("MongoDB connection error:", err);
  }
}

await connectDB(); // Vercel ke serverless environment me top-level await allowed

// ❌ app.listen(port) mat likho
export default app; // Vercel ko serverless function ke liye export karna hai
