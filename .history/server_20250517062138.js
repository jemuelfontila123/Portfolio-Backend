import express from "express";
var express = require("express");
var app = express();
import app from "./server/express.js";
import indexRouter from "./server/index-router";
const assetsRouter = require("./server/assets-router");
app.use("/src", assetsRouter);
app.use("/", function (req, res) {
  res.send("Welcome to User application");
});
app.listen(3000);
console.log("Server running at http://localhost:3000/");
module.exports = app;
