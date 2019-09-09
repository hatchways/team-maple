const express = require("express");
const passport = require("passport");
const AWS = require("aws-sdk");
const uuidv4 = require("uuid/v4");
const Contest = require("../models/Contest"); 

const s3 = new AWS.S3({
  region: process.env.S3_REGION,
  signatureVersion: 'v4',
 });


const router = express.Router();

router.get(
  "/profile",
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

router.post(
  "/submission",
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

module.exports = router;
