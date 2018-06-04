const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const db = require('./dbConnection');

const keys = require('./keys');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = () => {

  const jwtStrategy = new JwtStrategy(opts, (jwt_payload, next) => {
    sql = "SELECT * FROM users WHERE email = ?"
  })
}