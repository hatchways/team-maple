const Submission = require("../models/Submission");
const Contest = require("../models/Contest");
const Notification = require("../models/Notification");
const User = require("../models/User");
const uuidv4 = require("uuid/v4");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.putWinner = async (req, res, next) => {
  const subId = req.query.winner;
  const { contestId } = req.params;
  const { creator } = req.body;

  try {
    const { customerId } = req.user;
    if (!customerId) {
      return res.status(422).json({ msg: "Contest creator must have a card added"});
    }
    const paymentMethods = await stripe.paymentMethods.list({
      customer: customerId, type: 'card'
    });
    console.log(paymentMethods);

    const contest = await Contest.findById(contestId);
    if (!contest) {
      return res.status(422).json({ msg: "No such contest found" });
    }

    const transfer_group = uuidv4();

    const paymentIntent = await stripe.paymentIntents.create({
      amount: contest.prize * 100,
      currency: 'cad',
      payment_method_types: ['card'],
      customer: customerId,
      payment_method: paymentMethods.data[0].id,
      description: `Prize for ${contest.title}`,
      off_session: true,
      confirm: true,
      transfer_group,
    })

    console.log("made payment", paymentIntent);
    
    if (paymentIntent.status !== "succeeded") {
      return res.status(422).json({ msg: "payment method not accepted" });
    }
    
    contest.winner = subId;
    contest.status = "COMPLETED";
    await contest.save();
    
    res.status(200).json({ msg: "selected a winner successful", contest });
    
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
    
    const response = await Contest
      .findById(contestId)
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
    
    if (!response) {
      res.status(404).json({ msg: "contest not found" });
    }
    console.log(response);
    res
      .status(200)
      .json({ msg: "selected a winner successful", contest: response });

    // Try to transfer to other account
    const submission = await Submission
    .findById(subId)
    .populate("creator");
    let accountId = submission.creator.accountId;
    console.log("account ID originally: ", accountId);
    
    if (accountId) {
      console.log("account id being transferred to: ", accountId);
      const transfer = await stripe.transfers.create({
        amount: contest.prize * 100,
        currency: 'cad',
        destination: accountId,
        transfer_group,
        description: `Prize for ${contest.title}`,
      });
      console.log("transfer is ", transfer);
    } else {
      // Make an account for them and transfer
      const user = await User.findById(submission.creator.id);
      await stripe.accounts.create({
        type: "custom",
        country: "CA",
        email: user.email,
      }, async (err, account) => {
          console.log("made new account", account);
          user.accountId = account.id;
          accountId = account.id;
          await user.save();

          const transfer = await stripe.transfers.create({
            amount: contest.prize * 100,
            currency: 'cad',
            destination: accountId,
            transfer_group,
            description: `Prize for ${contest.title}`,
          });
          console.log("transfer is ", transfer);
      })
    }
  } catch (err) {
    console.log(err);
    // res.status(422).json({ msg: "error updating contest", error: err });
  }
};
