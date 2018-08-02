/**
 * Models
 */
const Bid = require('../models').bids;
const Project = require('../models').projects;


/**
 * Validation
 */
const validateBidInput = require('../validation/bid');

/**
 * Utilities
 */
const moment = require('moment');

exports.get_bids_by_project = (req, res) => {
  Bid.findAll({
      where: {
        project_id: req.params.projectId
      }
    }).then((bids) => {
      res.json(bids);
    })
    .catch(err => res.json(err));
}

exports.create_bid = (req, res) => {
  const {
    errors,
    isValid
  } = validateBidInput(req.body);

  if (!isValid)  {
    return res.status(400).json(errors);
  }

  Project.findOne({
    where: {
      id: req.params.projectId
    }
  }).then((project) => {
    const today = moment().format('MM-DD-YYYY');
    if (project.project_end <= today) {
      res.status(400).json({
        denied: 'You can not bid on this project anymore'
      });
    } else {
      Bid.create({
          project_id: project.id,
          user_id: req.user.id,
          price: req.body.price
        }).then((bid) => {
          res.json(bid)
        })
        .catch(err => res.json(err));
    }
  })
}

exports.delete_bid = (req, res) => {
  Bid.findOne({
      where: {
        id: req.params.id,
        user_id: req.user.id
      }
    }).then((bid) => {
      console.log(bid);
      if (!bid) {
        res.status(404).json({
          nobids: 'This user has no bids'
        });
      }
      bid.destroy().then(() => {
        res.json({
          success: true
        });
      })
      return null;
    })
    .catch(err => res.json(err));
}