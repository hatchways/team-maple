const Submission = require("../models/Submission");
const Contest = require("../models/Contest");
const Notification = require("../models/Notification");

exports.putWinner = async (req, res, next) => {
  const subId = req.query.winner;
  const { contestId } = req.params;
  const { creator } = req.body;

  try {
    await Contest.findByIdAndUpdate(contestId, {
      winner: subId,
      status: "COMPLETED"
    });

    const contest = await Contest.findById(contestId)
      .populate("creator", "name email profileUrl")
      .populate({
        path: "submissions",
        select: "url creator winner",
        populate: {
          path: "creator",
          select: "name"
        }
      })
      .select("-createdAt -updatedAt");
    if (!contest) {
      return res.status(404).json({ msg: "contest not found" });
    } else {
      res.status(200).json({ msg: "selected a winner successful", contest });
    }

    const { users, io } = req.app.io;
    const winnerNotification = new Notification({
      message:
        `congratulations you have been chosen as the winner of the contest: ${contest.title}!`,
      priority: "high",
      read: false,
      notifOwner: creator,
      link: `/contest/${contestId}`
    });

    await winnerNotification.save();
    if (users[creator._id]) {
      io.in(users[creator._id]).emit("addNotification", {
        notification: winnerNotification
      });
    }

    const paymentNotification = new Notification({
      message: "Your payment has been made",
      priority: "high",
      read: false,
      notifOwner: creator,
      link: `/contest/${contestId}`
    });

    await paymentNotification.save();
    if (users[creator._id]) {
      io.in(users[creator._id]).emit("addNotification", {
        notification: paymentNotification
      });
    }

    const notificationsArray = [];
    for (let i = 0; i < contest.submissions.length; i++) {
      const endedNotification = new Notification({
        message: `the contest ${contest.title} has ended`,
        priority: "medium",
        read: false,
        notifOwner: contest.submissions[i].creator._id,
        link: `/contest/${contestId}`
      });
      notificationsArray.push(endedNotification);
    }

    const unique = notificationsArray.reduce(
      (acc, curr) => {
        let id = curr.notifOwner;

        if (acc.temp.indexOf(id) === -1) {
          acc.out.push(curr);
          acc.temp.push(id);
        }

        return acc;
      },
      {
        temp: [],
        out: []
      }
    ).out;

    await Notification.insertMany(unique);

    for (let i = 0; i < unique.length; i++) {
      if (users[unique[i].notifOwner]) {
        io.in(users[unique[i].notifOwner]).emit("addNotification", {
          notification: unique[i]
        });
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(422).json({ msg: "error updating contest", error: err });
  }
};
