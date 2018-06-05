const bcrypt = require('bcryptjs');
const User = require('../models').users;
const jwt = require('jsonwebtoken');
const keys = require('../../../config/keys');
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

exports.create_user = (req, res) => {
  const {
    errors,
    isValid
  } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }


  User.find({
      where: {
        email: req.body.email
      }
    })
    .then((user) => {
      if (user) {
        return res.status(400).json({
          email: 'This email already exists'
        })
      }

      User.create({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          role_id: 2
        }).then((user) => {
          res.json(user);
        })
        .catch(err => res.json(err));
    })
}

exports.user_login = (req, res) => {
  const {
    errors,
    isValid
  } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }


  const email = req.body.email;
  const password = req.body.password;
  User.findOne({
    where: {
      email: email
    }
  }).then((user) => {
    if (!user) {
      res.status(404).json({
        noUser: 'User not found'
      });
    }

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        jwt.sign({
            id: user.id
          }, keys.secretOrKey, {
            expiresIn: 10000
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
              strategy: 'jwt'
            })
          })
      } else {
        return res.status(400).json({
          wrongpassword: 'Password incorrect'
        })
      }
    })
  })
}

exports.get_users = (req, res) => {
  User.findAll()
    .then((users) => {
      res.send(users);
    })
}