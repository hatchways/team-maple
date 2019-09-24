const jwtStrategy = require("passport-jwt").Strategy;
const extractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("User");
const secretOrKey = process.env.SECRETORKEY;

const opts = {};
opts.jwtFromRequest = extractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secretOrKey;

module.exports = passport => {
  passport.use(new jwtStrategy(opts, (jwt_payload, done) => {
    User.findOne({ email: jwt_payload.email}, (err, user) => {
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
  }))
};