const express = require("express");
const passport = require("passport");
const Conversation = require("../models/Conversation");
const User = require("../models/User");

const router = express.Router();

router.post('/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const { id } = req.params;
    try {
      if (id === req.user._id.toString()) {
        return res.status(422).send({ message: "Can only start a conversation with other people" });
      };

      const other = await User.findById(id);
      if (!other) return res.status(422).send({ message: "User does not exist" });

      const [user1, user2] = [id, req.user._id.toString()].sort((a, b) => a > b);

      const conversationExist = await Conversation.find({ user1, user2 });
      if (conversationExist.length) {
        return res.status(422).send({ message: "Conversation already exists!" });
      }
      const conversation = new Conversation({
        user1,
        user2,
      });

      const body = await conversation.save();
      res.status(200).json(body);
    } catch (err) {
      console.log(err);
      res.status(422).send({ message: "Improper conversation format" });
    }
  });

router.get('/conversations',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const { _id: id } = req.user;
    try {
      const conversations = await Conversation.find().or([{ user1: id }, { user2: id }]);
      if (conversations) {
        return res.status(200).json(conversations);
      } else {
        res.status(404).send({ message: "Invalid Request" });
      }
    } catch (e) {
      res.status(422).send({ message: "Invalid Request" });
    }
  });

router.get('/messages',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const { _id: id } = req.user;
    try {
      const conversations = await Conversation
        .find()
        .or([{ user1: id}, { user2: id }])
        .populate("messages");
      if (conversations) {
        return res.status(200).json(conversations);
      } else {
        console.log(e);
        res.status(404).send({ message: "Invalid Request" });
      }
    } catch (e) {
      console.log(e);
      res.status(422).send({ message: "Invalid Request" });
    }
  });

module.exports = router;