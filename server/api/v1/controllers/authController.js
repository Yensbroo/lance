/**
 * Config
 */
const keys = require('../../../config/keys');

/**
 * Models
 */
const User = require('../models').users;
const PassReset = require('../models').password_resets;

/**
 * Validation
 */
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

/**
 * Utilities
 */
const send = require('../../../utilities/email_sender').send_email;
const randomize = require('randomatic');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * Actions
 */

// Register a new user
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

      const email_token = randomize('Aa0', 25);



      User.create({
        full_name: req.body.full_name,
        email: req.body.email,
        password: req.body.password,
        role_id: 2,
        email_confirmed: false,
        confirmation_token: email_token
      }).then((user) => {
        //email settings
        const subject = `${user.full_name}, please verify your email!`;
        const text = 'Please verify your email';
        const email_body = `<h2>Verify your email</h2><br/>
      <a href="http://localhost:8000/verify/${user.confirmation_token}">Click this link to verify your email</a>`;

        //send email with verification token to user
        send(user.email, subject, text, email_body);

        res.json(user);
      })
        .catch(err => res.json(err));
    })
}

//Login as a user
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
        email: 'User not found'
      });
    }
    //check if the user confirmed his account
    if (!user.email_confirmed) {
      res.status(400).json({
        email: 'Please verify your account'
      });
    }

    //check if input password is the same as user password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {

        //create a json web token
        jwt.sign({
          id: user.id,
          full_name: user.full_name,
          email: user.email
        }, keys.secretOrKey, {
            expiresIn: 10000
          },
          (err, token) => {
            res.json({
              user: user,
              success: true,
              token: "Bearer " + token,
              strategy: 'jwt'
            })
          })
      } else {
        return res.status(400).json({
          password: 'Password incorrect'
        })
      }
    })
  })
}




// Set user to confirmed
exports.confirm_user = (req, res, next) => {

  User.update({
    email_confirmed: true
  }, {
      where: {
        confirmation_token: req.params.id
      }
    }).then(() => {
      res.json({
        succes: true
      });
    })
}