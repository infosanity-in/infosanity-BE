require("dotenv").config();

// For using JWT authentication Strategy
const { Strategy, ExtractJwt } = require("passport-jwt");

// Import USER model
const { User } = require("../models");

const options = {};
options.jwtFrmomRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrkey = process.env.JWT_SECRET;

module.exports = (passport) => {
  passport.use(
    new Strategy(options, (jwt_payload, done) => {
      User.findbyId(jwt_payload.id)
        .then((user) => {
          if (user) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        })
        .catch((err) => {
          console.log("ERROR in PASSPORT.js");
          console.log("ERROR: ", err);
        });
    })
  );
};
