const express = require("express");
const passport = require("passport");
const Contest = require("../models/Contest");
const defaultLinks = require("../services/defaultLinks");

const router = express.Router();

router.get('/defaultImages', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.status(200).send({
   links: defaultLinks.default,
  });
});

router.post('/create', 
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const {
      title,
      description,
      prize,
      images,
      deadline,
    } = req.body;
    const contest = new Contest({
      title,
      description,
      prize,
      images,
      status: "IN PROGRESS",
      deadline,
      creator: req.user._id,
    });
    try {
      const body = await contest.save();
      res.status(200).send(body.toObject());
    } catch (err) {
      res.status(422).send({ message: "Improper contest format" });
    }
})

module.exports = router;