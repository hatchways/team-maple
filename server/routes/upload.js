const express = require("express");
const passport = require("passport");
const AWS = require('aws-sdk');
const uuidv4 = require('uuid/v4');

const s3 = new AWS.S3({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  signatureVersion: 'v4',
  region: process.env.S3_REGION,
});

const router = express.Router();


router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const key = `${req.user.id}/${uuidv4()}.jpeg`;

  s3.getSignedUrl(
    'putObject',
    {
      Bucket: process.env.S3_BUCKET,
      ContentType: 'image/jpeg',
      Key: key,
    },
    (err, url) => {
      res.send({ key, url });
    }
  );
});

module.exports = router;