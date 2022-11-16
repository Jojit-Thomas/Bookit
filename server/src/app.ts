// const createError = require("http-errors");
import createError from "http-errors";
// const express = require("express");
import express, { ErrorRequestHandler } from "express";
// const path = require("path");
import path from "path";
// const cookieParser = require("cookie-parser");
import cookieParser from "cookie-parser";
// const logger = require("morgan");
import logger from "morgan";
// const indexRouter = require("./routes/index");
import indexRouter from "./routes/index";
// const authRouter = require("./routes/auth");
import authRouter from "./routes/auth";
// const adminRouter = require("./routes/admin");
import adminRouter from "./routes/admin";
// const mongoose = require("mongoose");
import mongoose from "mongoose";
// const cors = require('cors');
import cors from "cors";

import dotenv from "dotenv/config"

mongoose.connect(`mongodb+srv://bookit:${process.env.MONGO_PASSWORD}@cluster0.glsi7xa.mongodb.net/?retryWrites=true&w=majority`, {dbName : "bookit"});

mongoose.connection.on("connecting", () => {
  console.log("Connecting to Database");
});

mongoose.connection.on("connected", () => {
  console.log("Mongoose Connected to Database");
});

mongoose.connection.on("error", (err) => {
  console.error(err.message);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose Connection is Disconnected.");
});

const app = express();
const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use("/api", indexRouter);
app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

const errorHandler: ErrorRequestHandler = function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  console.error("``Err : ``", err.status, err.message);
  // render the error page
  res.status(err.status || 500).json("Internal Server Error");
  // res.render("error");
};
// error handler
app.use(errorHandler);

module.exports = app;
