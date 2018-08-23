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
const validateUserInput = require('../validation/user');

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
          email: 'Dit emailadres is reeds in gebruik'
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
          const subject = `${user.full_name}, Verifieer je account!`;
          const text = 'Verifieer je account';
          const email_body = `<h2>Verifieer je account</h2><br/>
      <a href="http://localhost:8000/verify/${user.confirmation_token}">Klik deze link om je account te verifiëren</a>`;

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
        email: 'Deze gebruiker bestaat niet'
      });
    }
    //check if the user confirmed his account
    if (!user.email_confirmed) {
      res.status(400).json({
        email: 'Verifieer je account'
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
          password: 'Het opgegeven wachtwoord is incorrect'
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

// Update user
exports.update_user = (req, res) => {
  const {
    errors,
    isValid
  } = validateUserInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const userFields = req.body;
  console.log(userFields)
  User.findOne({
    where: {
      id: req.user.id
    }
  }).then((user) => {
    if (user) {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(userFields.newPassword, salt, (err, hash) => {
          if (err) throw err;
          userFields.newPassword = hash
          bcrypt.compare(userFields.oldPassword, user.password).then(isMatch => {
            if (isMatch) {
              user.update({
                email: userFields.email,
                password: userFields.newPassword
              }).then((user => res.json(user)))
            } else {
              errors.oldPassword = "Je oude wachtwoord is niet correct"
              return res.status(400).json(errors);
            }
          })
        })
      })
    } else {
      res.status(404).json({
        noUser: "Geen gebruiker gevonden"
      })
    }
  })
}