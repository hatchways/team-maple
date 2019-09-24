const path = require("path");
require("dotenv").config();
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
const uuidv4 = require("uuid/v4");
import uploadRouter from "./routes/upload";
import contestRouter from "./routes/contest";
import profileRouter from "./routes/profile";
import conversationRouter from "./routes/conversation";
import messageRouter from "./routes/message";
import contestsRouter from './routes/discovery';
import notificationRouter from './routes/notification';
import stripeRouter from './routes/stripe';


var app = express();

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/images", express.static(path.join(__dirname, "images")));

app.use(express.static(join(__dirname, "images")));

app.use(passport.initialize());
require("./services/passport")(passport);
app.use('/auth', authRoutes);
app.use("/", indexRouter);
app.use("/ping", pingRouter);
app.use("/upload", uploadRouter);
app.use("/contest", contestRouter);
app.use("/profile", profileRouter);
app.use("/conversation", conversationRouter);
app.use("/message", messageRouter);
app.use(submitRoutes);
app.use(contestsRouter);
app.use('/notification', notificationRouter);
app.use("/stripe", stripeRouter);

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true
  })
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

if (['production', 'ci'].includes(process.env.NODE_ENV)) {
  app.use(express.static('client/build'));
  
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve('client', 'build', 'index.html'));
  });
}

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

module.exports = app;
