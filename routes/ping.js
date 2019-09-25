var express = require("express");
var router = express.Router();

router.post("/", function(req, res, next) {
  const teamName = req.body.teamName;
  const teamArray = process.env.TEAM_NAME || [];
  if (
    teamName &&
    teamArray &&
    teamArray.indexOf(teamName) >= 0
  )
    res.status(200).send({ response: `${teamName} is part of the team!` });
  else
    res.status(400).send({
      response: `${teamName} is not part of the team. Modify your .env`
    });
});

module.exports = router;
