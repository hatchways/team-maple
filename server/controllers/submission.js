const Submission = require("../models/Submission");

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
  console.log(req.params);
  // const { contestId } = req.params;

}