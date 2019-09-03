const { body } = require("express-validator");
const User = require("../../models/User");

const validation = [
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
];



module.exports = validation;