const express = require('express');
const submitController = require('../controllers/submission');

const router = express.Router;

router.post('/submit', submitController.postSubmission);

module.exports = router;