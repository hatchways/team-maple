const express = require("express");
const router = express.Router();
const passport = require("passport");
const contestsController = require("../controllers/contests");

router.get(
  "/api/contests",
  passport.authenticate("jwt", { session: false }),
  contestsController.getContests
);

module.exports = router;
