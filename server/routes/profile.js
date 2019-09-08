const express = require("express");
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

router.get("/:id",
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findOne({
        _id: id,
      }).populate({
        path: "contests",
        select: "title description prize status",
        populate: {
          path: "submissions",
          select: "id url",
        },
      }).populate({
        path: "submissions",
        select: "id url",
        populate: {
          path: "contest",
          select: "title description prize status",
        },
      }).select("email id name profileUrl");

      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).send({ message: "Invalid Request" });
      }
    } catch (e) {
      res.status(422).send({ message: "Invalid Request" });
    }
  }
);

module.exports = router;