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
  
  router.get("/:id",
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const { id } = req.params;
      const contest = await Contest.findOne({
        creator: req.user._id,
        _id: id,
      }).populate("creator", "name email profileUrl")
        .select("-createdAt -updatedAt");
      if (contest) {
        res.status(200).send(contest.toObject());
      } else {
        res.status(404).send({ message: "Invalid Request" })
      }
    } catch (e) {
      res.status(422).send({ message: "Invalid Request" });
    }
})

module.exports = router;