const express = require("express");
const passport = require("passport");
const Conversation = require("../models/Conversation");
const User = require("../models/User");
const Message = require("../models/Message");

const router = express.Router();

router.post('/:id', 
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const { id: conversationId } = req.params;
    const { content } = req.body;
    try {
      const conversationExist = await Conversation.findById(conversationId);
      if (!conversationExist) {
        return res.status(422).send({ message: "Conversation doesn't exist!" });
      }
      const { user1, user2 } = conversationExist; 
      if (user1 !== req.user._id && user2 !== req.user._id) {
        return res.status(422).send({ message: "Not allowed in conversation" });
      }
      
      const message = new Message({
        content,
        sender: req.user._id,
        conversation: conversationId,
      });
      
      const body = await message.save();
      res.status(200).json(body);
    } catch (err) {
      console.log(err);
      res.status(422).send({ message: "Improper message format" });
    }
});


module.exports = router;