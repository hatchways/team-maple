const Submission = require("../models/Submission");
const Contest = require("../models/Contest");

exports.putWinner = async (req, res, next) => {
  const subId = req.query.winner;
  const { contestId } = req.params;

  try {
    await Contest.findByIdAndUpdate(contestId, {
      winner: subId,
      status: "COMPLETED"
    });

    // const contest = await Contest.findOne({
    //   _id: id
    // })
    

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
    }
    console.log(contest);
    return res
      .status(200)
      .json({ msg: "selected a winner successful", contest });
  } catch (err) {
    console.log(err);
    return res.status(422).json({ msg: "error updating contest", error: err });
  }
};
