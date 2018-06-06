const Bid = require('../models').bids;
const Project = require('../models').projects;

exports.get_bids_by_project = (req, res) => {
  Bid.findAll({
    where: {
      project_id: req.params.projectId
    }
  }).then((bids) => {
    res.json(bids);
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