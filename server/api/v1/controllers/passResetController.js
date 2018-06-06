/**
 *  Models
 */
const User = require('../models').users;
const PassReset = require('../models').password_resets;

/**
 * Utilities
 */
const send = require('../../../utilities/email_sender').send_email;
const randomize = require('randomatic');
const bcrypt = require('bcryptjs');

//Request for password reset
exports.reset_request = (req, res) => {
  User.findOne({
      where: {
        email: req.body.email
      }
    }).then((user) => {
      if (!user) {
        res.status(404).json('User not found');
      }

      const reset_token = randomize('AaO', 40);

      PassReset.findOne({
        where: {
          email: user.email
        }
      }).then((result) => {
        if (result) {
          res.status(400).json({
            alreadyrequested: 'There already has been a request to reset this password'
          })
        } else {
          PassReset.create({
            email: user.email,
            token: reset_token
          }).then((result) => {
            const subject = `You requested to reset your password!`;
            const text = 'Request your password';
            const email_body = `<h2>Reset your password</h2><br/>
          <a href="http://localhost:8000/verify/${result.token}">Click this link to reset your password</a><br/>
          <p>If you did not request to reset your password, please click this <a href="http://localhost:8000/deny_reset/${result.token}">link</a>`;
            send(result.email, subject, text, email_body);
            res.json(result);
          })
        }

      })
    })
    .catch(err => res.json(err));
}

exports.reset_password = (req, res) => {
  let password = req.body.password;

  PassReset.findOne({
    where: {
      token: req.params.token
    }
  }).then((result) => {

    if (!result) {
      res.status(404).json({
        norequest: 'There is no request for a password reset'
      });
    }

    //Hash password before changing it
    bcrypt.genSalt(10, (err, salt) => {
      if (err) throw err;
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) throw err;
        password = hash
        User.update({
            password: password
          }, {
            where: {
              email: result.email
            }
          }).then(() => {
            PassReset.destroy({
              where: {
                email: result.email
              }
            }).then(() => {
              return null;
            })
            res.json({
              success: 'Your password has been reset'
            });
          })
          .catch(err => res.json(err))
      })
    });
  })
}

exports.deny_reset = (req, res) => {
  PassReset.destroy({
      where: {
        token: req.params.token
      }
    }).then(() => {
      res.json({
        success: 'The reset request has been removed'
      });
    })
    .catch(err => res.json(err));
}