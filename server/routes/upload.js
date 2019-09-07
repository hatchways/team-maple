const passport = require("passport");
const AWS = require("aws-sdk");
const uuidv4 = require("uuid/v4");
const Contest = require("../models/Contest");

const s3 = new AWS.S3({
  region: process.env.S3_REGION,
 });

module.exports = app => {
  app.get(
    "/upload/",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      const key = `${req.user.id}/${uuidv4()}.jpeg`;
  
      s3.getSignedUrl(
        "putObject",
        {
          Bucket: process.env.S3_BUCKET,
          ContentType: "image/jpeg",
          Key: key
        },
        (err, url) => {
          res.send({ key, url });
        }
      );
    }
  );
  
  app.post(
    "/upload/submission",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      const { contestId } = req.body;
      const contest = await Contest.findOne({ _id: contestId });
  
      if (contest) {
        const key = `${contestId}/${uuidv4()}.jpeg`;
        s3.getSignedUrl(
          "putObject",
          {
            Bucket: process.env.S3_BUCKET,
            ContentType: "image/jpeg",
            Key: key
          },
          (err, url) => {
            res.send({ key, url });
          }
        );
      } else {
        res.status(422).send({ message: "Invalid Request" });
      }
    }
  );
}
