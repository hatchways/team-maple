const path = require("path");
const dotEnvPath = path.resolve("../.env");
require("dotenv").config({ path: dotEnvPath });
import createError from "http-errors";
import express, { json, urlencoded } from "express";
import { join } from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import passport from "passport";
import mongoose from "mongoose";

import indexRouter from "./routes/index";
import pingRouter from "./routes/ping";
import authRoutes from "./routes/auth";
import submitRoutes from "./routes/submission";
const multer = require("multer");
const uuidv4 = require("uuid/v4");
import uploadRouter from "./routes/upload";
import contestRouter from "./routes/contest";
import profileRouter from "./routes/profile";


var app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'images'),
  filename: (req, file, cb) => cb(null, uuidv4())
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(multer({ storage, fileFilter }).single("image"));

app.use(passport.initialize());
require("./services/passport")(passport);

app.use('/auth', authRoutes);
app.use("/", indexRouter);
app.use("/ping", pingRouter);
app.use("/upload", uploadRouter);
app.use("/contest", contestRouter);
app.use("/profile", profileRouter);
app.use(submitRoutes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  console.log(err);
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err });
});

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true
  })
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

module.exports = app;
