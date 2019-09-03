const express = require("express");
const authController = require("../controllers/auth");
const router = express.Router();
const { body } = require("express-validator");
const User = require("../models/User");

router.post(
  "/signup",
  [
    body("name")
      .trim()
      .isEmpty(),
    body("email")
      .isEmail()
      .withMessage("Email not valid")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then(exEmail => {
          if (exEmail) {
            return Promise.reject("Email already exists!");
          }
        });
      })
      .normalizeEmail(),
    body("password")
      .trim()
      .isLength({ min: 8 })
  ],
  authController.signup
);

router.post("/login", authController.login);

module.exports = router;