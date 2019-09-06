const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/User");
const passport = require("passport");

const router = express.Router();

router.patch("/",
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const id = req.user._id;
      const user = await User.findById(id);
      
      if (user) {
        const {
          name,
          profileUrl,
        } = req.body;
        if (name) user.name = name;
        if (profileUrl) user.profileUrl = profileUrl;

        const body = await user.save();
        res.status(200).send({
          name: body.name,
          email: body.email,
          profileUrl: body.profileUrl,
        });
      } else {
        // user not found
        res.status(404).send( { error: "Invalid user" });
      }
    } catch (err) {
      res.status(404).send({ error: "Invalid request" });
    }
});

module.exports = router;