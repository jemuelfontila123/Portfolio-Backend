var express = require("express");
import app from "./server/express.js";

var app = express();
const assetsRouter = require("./server/assets-router");
app.use("/src", assetsRouter);
app.use("/", function (req, res) {
  res.send("Welcome to User application");
});
app.listen(3000);
console.log("Server running at http://localhost:3000/");
module.exports = app;
