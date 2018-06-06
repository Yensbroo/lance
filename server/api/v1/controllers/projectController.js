/**
 * Models
 */
const Project = require('../models/').projects;
const User = require('../models').users;

/**
 * Validation
 */
const validateProjectInput = require('../validation/project');

/**
 * Utilities
 */
const moment = require('moment');

exports.get_projects = (req, res) => {
  Project.findAll({
      where: {
        published: true
      },
      include: {
        model: User,
        attributes: {
          exclude: ['updated_at', 'password', 'email', 'confirmation_token', 'email_confirmed', 'created_at', 'deleted_at', 'remember_token', 'role_id']
        }
      }
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
  Project.find({
      where: {
        id: req.params.id
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

exports.create_and_publish_project = (req, res) => {
  const {
    errors,
    isValid
  } = validateProjectInput(req.body)

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const projectData = {
    user_id: req.user.id,
    category_id: req.body.category_id,
    project_start: req.body.project_start,
    project_end: req.body.project_end,
    budget: req.body.budget,
    title: req.body.title,
    body: req.body.body,
    published_at: Date.now()
  }
  Project.create(projectData).then((project) => {
      res.json(project);
    })
    .catch(err => res.json(err));
}

exports.create_and_save_project = (req, res) => {
  const {
    errors,
    isValid
  } = validateProjectInput(req.body)

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const projectData = {
    user_id: req.user.id,
    category_id: req.body.category_id,
    project_start: req.body.project_start,
    project_end: req.body.project_end,
    budget: req.body.budget,
    title: req.body.title,
    body: req.body.body,
    published: false
  }
  Project.create(projectData).then((project) => {
      res.json(project);
    })
    .catch(err => res.json(err));
}

exports.update_project = (req, res) => {
  const {
    errors,
    isValid
  } = validateProjectInput(req.body)

  if (!isValid) {
    return res.status(400).json(errors);
  }

  Project.findOne({
    where: {
      id: req.params.id
    }
  }).then((project) => {
    const projectFields = {
      user_id: req.user.id,
      category_id: req.body.category_id,
      project_start: req.body.project_start,
      project_end: req.body.project_end,
      budget: req.body.budget,
      title: req.body.title,
      body: req.body.body,
    }
    if (!project) {
      res.status(404).json({
        notfound: 'No project found'
      });
    }

    if (project.user_id !== req.user.id) {
      res.status(400).json({
        baduser: 'This is not your project'
      });
    }

    const today = moment().format('MM-DD-YYYY');

    if (project.project_start <= today) {
      res.status(400).json({
        denied: 'You cannot update this project anymore'
      });
    } else {
      project.update(projectFields).then((project) => {
        res.json(project);
      })
    }
  })
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
      if (project.project_start <= today) {
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