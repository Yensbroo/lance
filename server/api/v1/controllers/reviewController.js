const Review = require('../models').reviews;
const User = require('../models').users;


exports.create_review = (req, res) => {
  Review.create({
      user_id: req.user.id,
      profile_id: req.params.profileId,
      review: req.body.review,
    }).then((review) => {
      res.json(review);
    })
    .catch(err => res.json(err));
}

exports.get_reviews_by_profile = (req, res) => {
  Review.findAll({
      where: {
        profile_id: req.params.profileId
      },
      include: {
        model: User,
        attributes: {
          exclude: ['updated_at', 'password', 'email', 'confirmation_token', 'email_confirmed', 'created_at', 'deleted_at', 'remember_token', 'role_id', 'deleted_at']
        }
      }
    }).then((reviews) => {
      res.json(reviews)
    })
    .catch(err => res.json(err));
}