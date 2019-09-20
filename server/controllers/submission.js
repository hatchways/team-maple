const Submission = require("../models/Submission");
const Contest = require("../models/Contest");
const Notification = require("../models/Notification");

exports.postSubmission = (req, res, next) => {
  const { imageUrl, contestId } = req.body;
  const userId = req.user._id;

  const submission = new Submission({
    url: imageUrl,
    creator: userId,
    contest: contestId
  });

  // submission
  //   .save()
  //   .then(result => {
  //     console.log("created submission");
  //     return res.status(200).json({ message: "submission created", result });
  //   })
  //   .catch(err => console.log(err));

  // update notifications table
  Contest.findById(contestId)
    .then(contest => {
      console.log("contest", contest);
      const notification = new Notification({
        message: "you have a new submission",
        priority: "high",
        read: false,
        notifOwner: contest.creator,
        link: `/contest/${contest._id}`
      });

      notification.save();

      // emit notification to contest creator
      const { users, io } = req.app.io;
      console.log('users', users, 'io', io);
      if (users[contest.creator]) {
        io.in(users[contest.creator]).emit("addNotification", {
          notification
        });
        console.log('contest.deadline', contest.deadline);

        if(new Date() >= new Date(contest.deadline)) {
          //should be >= but deadlines are too far away
          console.log('deadline passed');
        }

      }
    })
    .catch(err => console.log(err));
};

exports.getSummary = (req, res, next) => {
  const { subId } = req.params;
  Submission.findById(subId)
    .populate({
      path: "creator",
      select: "name"
    })
    .populate("contest")
    .then(sub => {
      return res.status(200).json({ msg: "successfully fetched", sub });
    })
    .catch(err => console.log(err));
};
