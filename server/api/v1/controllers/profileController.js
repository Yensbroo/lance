/**
 * Models
 */
const Profile = require('../models').profiles;
const User = require('../models').users;

exports.create_profile = (req, res) => {
  Profile.create({
      bio: req.body.bio,
      headline: req.body.headline,
      user_id: req.user.id,
      full_name: req.body.full_name
    }).then((profile) => {
      res.json(profile);
    })
    .catch(err => res.json(err));
}

exports.get_profile_by_id = (req, res) => {
  Profile.findOne({
    where: {
      user_id: req.params.userId
    },
    include: {
      model: User,
      attributes: {
        exclude: ['updated_at', 'password', 'email', 'confirmation_token', 'email_confirmed', 'created_at', 'deleted_at', 'remember_token', 'role_id', 'deleted_at']
      }
    }
  }).then((profile) => {
    res.json(profile);
  })
}

exports.edit_profile = (req, res) => {
  Profile.findOne({
    user_id: req.user.id
  }).then((profile) => {
    if (!profile) {
      res.status(404).json({
        notfound: 'Er is geen profiel gevonden van deze gebruiker'
      });
    }
    profile.update({
      headline: req.body.headline,
      bio: req.body.bio,
      updated_at: Date.now()
    }).then(() => {
      res.json({
        success: 'Het profiel is geupdatet'
      })
    })
  })
}