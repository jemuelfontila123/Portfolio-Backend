import express from "express";
import app from "./server/express.js";
import router from "./server/assets-router.js";

// Mount the assets router for static/asset files
app.use("/src", router);

// Fallback route
app.use("/", function (req, res) {
  res.send("Welcome to User application");
});

// Start the server on port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});