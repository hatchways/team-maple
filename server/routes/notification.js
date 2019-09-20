const express = require("express");
const router = express.Router();
const passport = require("passport");
const notificationController = require("../controllers/notification");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  notificationController.getNotifications
);

module.exports = router;
