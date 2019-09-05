const Submission = require('../models/Submission');

exports.postSubmission = (req, res, next) => {
  //todo validation

  if (!req.file) {
    return res.status(422).json({ message: "No image provided" });
  }

  console.log(req);

};
