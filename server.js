import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./server/express.js";
import router from "./server/assets-router.js";
import contactRouter from "./routes/contactRoutes.js"
import Contact from "./models/Contact.js";
import User from "./models/User.js";
import Project from "./models/Project.js";
import Qualification from "./models/Qualification.js";
dotenv.config();
// Check if URI is loaded properly
console.log(process.env.MONGODB_URI)
if (!process.env.MONGODB_URI) {
  console.error("Error: MONGODB_URI is not defined in environment variables.");
  process.exit(1);
}

// Connect to MongoDB
await mongoose.connect(process.env.MONGODB_URI, {
  dbName: "Portfolio"
});


console.log("Connected database:", mongoose.connection.name);


const collections = await mongoose.connection.db
  .listCollections()
  .toArray();

console.log(
  "Collections:",
  collections.map(collection => collection.name)
);


// // Fallback route
// app.use("/", function (req, res) {
//   res.send("Welcome to User application");
// });

app.use("/", contactRouter);

// Start the server on port 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});


