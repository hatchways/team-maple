const Submission = require("../models/Submission");

exports.postSubmission = (req, res, next) => {
  //todo validation

  if (!req.file) {
    return res.status(422).json({ message: "No image provided" });
  }

  const imageUrl = req.file.path.replace("\\", "/");
  const userId = req.body.userId;
  console.log(userId);

  const submission = new Submission({
    url: imageUrl,
    creator: userId
  });

  submission
    .save()
    .then(result => {
      console.log("created submission");
      return res.status(200).json({ message: "submission created", result });
    })
    .catch(err => console.log(err));
};
