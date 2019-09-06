const express = require("express");
const passport = require("passport");
const router = express.Router();
const defaultLinks = require("../services/defaultLinks");


router.get('/defaultImages', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.status(200).send({
   links: defaultLinks.default,
  });
});

module.exports = router;