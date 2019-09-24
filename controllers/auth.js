const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const axios = require("axios");
const Notification = require("../models/Notification");

exports.signup = (req, res, next) => {
  console.log(req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("errors are", errors);
    return res
      .status(422)
      .json({ message: "validation failed", errorData: errors.array() });
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
      res.status(201).json({ message: "User Created" });
    })
    .catch(err => console.log(err));
};

exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loggedUser;
  User.findOne({ email })
    .then(user => {
      if (!user) {
        console.log("user with email doesnt exist");
        return res
          .status(422)
          .json({ message: "invalid email/password combination" });
      }
      loggedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then(equal => {
      if (!equal) {
        return res
          .status(422)
          .json({ message: "invalid email/password combination" });
      }

      const token = jwt.sign(
        {
          email: loggedUser.email,
          userId: loggedUser._id.toString()
        },
        process.env.SECRETORKEY,
        { expiresIn: "1h" }
      );

      res
        .status(200)
        .json({
          message: "logged in!",
          token,
          userId: loggedUser._id.toString()
        });
    })
    .catch(err => {
      console.log(err);
    });
};


exports.demo = async (req, res) => {
  try {
    const person = await axios.get("https://randomuser.me/api/?nat=us");
    const { name: nameObj, email } = person.data.results[0];
    const name = nameObj.first + " " + nameObj.last;
    const password = "password";
    const customerId = process.env.CUSTOMERID;

    bcrypt
      .hash(password, 12)
      .then(hashedPw => {
        const user = new User({ name, email, password: hashedPw, customerId });
        return user.save();
      })
      .then(async user => {
        const token = jwt.sign(
          {
            email: user.email,
            userId: user._id.toString()
          },
          process.env.SECRETORKEY,
          { expiresIn: "1h" }
        );

        const demoNotif1 = new Notification({
          message: `Thank you for looking at my project. Your email is: ${user.email} and password is "password"`,
          priority: "high",
          read: false,
          notifOwner: user.id,
        });

        const demoNotif2 = new Notification({
          message: `You can create contests, submit to contests, change profile, and many more`,
          priority: "high",
          read: false,
          notifOwner: user.id,
        });

        const demoNotif3 = new Notification({
          message: `To test chat, open another browser (or private session) and log in as another user`,
          priority: "high",
          read: false,
          notifOwner: user.id,
        });
        const demoNotifications = [demoNotif1, demoNotif2, demoNotif3];
        await Notification.insertMany(demoNotifications);

        res
          .status(200)
          .json({
            message: "logged in!",
            token,
            userId: user._id.toString()
          });
      })
      .catch(err => console.log(err));
      
    
  } catch (err) {
    console.log(err);
  }
}
