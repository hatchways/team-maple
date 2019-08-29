const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

exports.signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ message: "validation failed", errorData: errors.array() });
    // const error = new Error('Validation failed');
    // error.statusCode = 422;
    // error.data = error.array();

    // throw error;
  }
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  bcrypt
    .hash(password, 12)
    .then(hashedPw => {
      const user = new User({ name, email, password: hashedPw });
      return user.save();
    })
    .then(result => {
      res.status(201).send("user created!");
    })
    .catch(err => console.log(err));
};

exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ message: "Invalid email or password", data: errors.array() });
  }
  let loggedUser;
  User.findOne({ email })
    .then(user => {
      if (!user) {
        return res.status(401).json({message: 'email doesnt exist'})
       
      }
      loggedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then(equal => {
      if (!equal) {
        return res.status(401).json({message: 'wrong password'})
      }

      const token = jwt.sign(
        {
          email: loggedUser.email,
          userId: loggedUser._id.toString()
        },
        "secretpassword",
        { expiresIn: "1h" }
      );

      res.status(200).json({ message: "logged in!", token });
    })
    .catch(err => {
      if (!err.code) {
        err.code = 500;
      }
      next(err);
    });
};
