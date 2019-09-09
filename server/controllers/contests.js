import Contest from "../models/Contest";

exports.getContests = (req, res, next) => {
  Contest.find()
    .then(contests => {
      if (!contests) {
        return res.status(422).json({ message: "No contests available!" });
      }
      return res
        .status(200)
        .json({ message: "contests successfully fetched", contests });
    })
    .catch(err => {
      return res.status(500).json({ message: "connection error" });
    });
};
