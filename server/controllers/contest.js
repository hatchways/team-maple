const Submission = require("../models/Submission");

exports.getWinner = (req, res, next) => {
  const subId = req.query.winner;
  Submission.findByIdAndUpdate(subId, {
    winner: true
  })
    .then(() => {
      return Submission.findById(subId);
    })
    .then(sub => {
      return res.status(200).json({ msg: "Successfully updated", data: sub });
    })
    .catch(err => {
      console.log(err);
      return res.status(422).json({ msg: "error updating submission", error: err });
    });
};
