const Submission = require("../models/Submission");
const Contest = require("../models/Contest");
const User = require("../models/User");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.putWinner = async (req, res, next) => {
  const subId = req.query.winner;
  const { contestId } = req.params;

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

    const paymentIntent = await stripe.paymentIntents.create({
      amount: contest.prize * 100,
      currency: 'usd',
      payment_method_types: ['card'],
      customer: customerId,
      payment_method: paymentMethods.data[0].id,
      off_session: true,
      confirm: true,
    })
    
    if (paymentIntent.status !== "succeeded") {
      return res.status(422).json({ msg: "payment method not accepted" });
    }
    
    contest.winner = subId;
    contest.status = "COMPLETED";
    contest.save();

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
      return res.status(404).json({ msg: "contest not found" });
    }
    console.log(response);
    return res
      .status(200)
      .json({ msg: "selected a winner successful", response });
  } catch (err) {
    console.log(err);
    return res.status(422).json({ msg: "error updating contest", error: err });
  }
};
