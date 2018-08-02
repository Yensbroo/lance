/**
 * Models
 */
const Project = require('../models/').projects;
const User = require('../models').users;
const Bid = require('../models').bids;
const Category = require('../models').categories;

/**
 * Utilities
 */
const moment = require('moment');

exports.get_projects = (req, res) => {
  Project.findAll({
      where: {
        published: true
      },
      include: [{
          model: User,
          attributes: {
            exclude: ['updated_at', 'password', 'email', 'confirmation_token', 'email_confirmed', 'created_at', 'remember_token', 'role_id', 'deleted_at']
          }
        }, {
          model: Bid,
          attributes: {
            exclude: ['updated_at', 'project_id', 'user_id']
          },
          include: {
            model: User,
            attributes: {
              exclude: ['updated_at', 'password', 'email', 'confirmation_token', 'email_confirmed', 'created_at', 'remember_token', 'role_id', 'deleted_at']
            }
          }
        },
        {
          model: Category,
        }
      ]
    }).then((projects) => {
      if (!projects) {
        res.status(404).json({
          noprojects: 'There are currently no projects'
        });
      }
      res.send(projects);
    })
    .catch(err => res.json(err));
}

exports.get_project_by_id = (req, res) => {
  Project.findOne({
      where: {
        id: req.params.id
      },
      include: {
        model: User,
        attributes: {
          exclude: ['updated_at', 'password', 'email', 'confirmation_token', 'email_confirmed', 'created_at', 'deleted_at', 'remember_token', 'role_id', 'deleted_at']
        }
      },
      include: {
        model: Bid,
        attributes: {
          exclude: ['updated_at', 'project_id', 'user_id']
        },
        include: {
          model: User,
          attributes: {
            exclude: ['updated_at', 'password', 'email', 'confirmation_token', 'email_confirmed', 'created_at', 'remember_token', 'role_id', 'deleted_at']
          }
        }
      }
    }).then(project => {
      if (!project) {
        res.status(404).json({
          noproject: 'This project does not exist'
        });
      }
      res.send(project);
    })
    .catch(err => res.json(err));
}


exports.get_projects_by_user = (req, res) => {
  Project.findAll({
      where: {
        user_id: req.user.id
      }
    }).then(projects => {
      if (!projects) {
        res.status(404).json({
          noprojects: 'This user has no projects'
        });
      }
      res.send(projects)
    })
    .catch(err => res.json(err));
}

exports.delete_project = (req, res) => {
  Project.findOne({
      where: {
        id: req.params.id,
        user_id: req.user.id
      }
    }).then((project) => {
      if (!project) {
        res.status(404).json({
          noproject: 'This project does not exist'
        });
      }
      project.destroy().then(() => {
        res.json({
          succes: true
        });
        return null;
      })
    })
    .catch(err => res.json(err));
}

exports.publish_unpublish_project = (req, res) => {
  Project.findOne({
    where: {
      id: req.params.id,
      user_id: req.user.id
    }
  }).then((project) => {
    if (!project) {
      res.status(404).json({
        noproject: 'This project does not exist'
      });
    }

    const today = moment().format('MM-DD-YYYY');

    if (project.published) {
      if (project.project_start >= today) {
        res.status(400).json({
          nounpublish: "This project can't be unpublished anymore"
        })
      } else {
        project.update({
          published: false,
          deleted_at: Date.now()
        }).then(() => {
          res.json({
            success: 'Project has been unpublished'
          })
        })
      }

    } else {
      project.update({
        published: true,
        deleted_at: null,
        published_at: Date.now()
      }).then(() => {
        res.json({
          success: 'Project has been published'
        })
      })
    }
  })
}