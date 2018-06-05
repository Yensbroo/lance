const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const keys = require('./keys');
const User = require('../api/v1/models').users;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = function (passport) {

  const jwtStrategy = new JwtStrategy(opts, (jwt_payload, next) => {
    User.findById(jwt_payload.id)
      .then(user => {
        if (user) {
          return next(null, user)
        } else {
          return next(null, false);
        }
      })
      .catch(err => console.log(err));
  })


  passport.use(jwtStrategy);
}