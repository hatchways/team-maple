const express = require('express');
const passport = require('passport');
const contestsController = require('../controllers/contests');

const router = express.Router();

router.get('/contests',  passport.authenticate('jwt', { session: false }), contestsController.getContests)

module.exports = router;