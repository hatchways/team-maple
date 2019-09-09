const Submission = require("../models/Submission");
const Contest = require("../models/Contest");

exports.postSubmission = (req, res, next) => {
  const { imageUrl, contestId } = req.body;
  const userId = req.user._id;

  const submission = new Submission({
    url: imageUrl,
    creator: userId,
    contest: contestId
  });

  submission
    .save()
    .then(result => {
      console.log("created submission");
      return res.status(200).json({ message: "submission created", result });
    })
    .catch(err => console.log(err));
};

exports.getSummary = (req, res, next) => {
  const { subId } = req.params;
  let savedSubmission = {};
  Submission.findById(subId)
    .then(sub => {
      if (!sub) {
        return res.status(422).json({ message: "resource not found" });
      }
      savedSubmission = sub;
      return Contest.findOne({
        _id: savedSubmission.contest
      });
    })
    .then(contest => {
      const newContest = {
        ...contest,
        submission: savedSubmission
      };
      return res
        .status(201)
        .json({ message: "successfully fetched", contest: newContest });
    })
    .catch(err => console.log(err));
};
