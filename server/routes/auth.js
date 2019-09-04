const express = require("express");
const authController = require("../controllers/auth");
const router = express.Router();
const authVal = require('./validation/auth');


router.post(
  "/signup",
  authVal,
  authController.signup
);

router.post("/login", [], authController.login);

module.exports = router;
