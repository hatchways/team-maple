const express = require('express');
const submitController = require('../controllers/submission');
const passport = require("passport");

const router = express.Router();

router.post('/submit', passport.authenticate('jwt', {session: false }), submitController.postSubmission);

router.get('/submitted/:subId', passport.authenticate('jwt', {session: false}), submitController.getSummary);

module.exports = router;