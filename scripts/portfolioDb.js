import mongoose from "mongoose";
import dotenv from "dotenv";
import { fileURLToPath } from "node:url";

dotenv.config({
  path: fileURLToPath(
    new URL("../.env", import.meta.url)
  ),
});

export async function connectPortfolio() {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is required");
  }

  await mongoose.connect(process.env.MONGODB_URI, {
    dbName: process.env.MONGODB_DB_NAME || "Portfolio",
  });

  console.log("Database:", mongoose.connection.name);
}