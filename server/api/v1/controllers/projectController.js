const Project = require('../models/').projects;
const User = require('../models').users


exports.get_projects = (req, res) => {
  Project.findAll({
    include: {
      model: User,
      attributes: {
        exclude: ['updated_at', 'password', 'email', 'confirmation_token', 'email_confirmed', 'created_at', 'deleted_at', 'remember_token', 'role_id']
      }
    }
  }).then((projects) => {
    res.send(projects);
  })
}

exports.get_project_by_id = (req, res) => {
  Project.find({
    where: {
      id: req.params.id
    }
  }).then(project => {
    res.send(project);
  })
}

exports.get_projects_by_user = (req, res) => {
  Project.findAll({
    where: {
      user_id: req.user.id
    }
  }).then(projects => {
    res.send(projects)
  })
}

exports.delete_project = (req, res) => {
  Project.findOne({
    where: {
      id: req.params.id,
      user_id: req.user.id
    }
  }).then((project) => {
    project.destroy().then(() => {
      res.json({
        succes: true
      });
      return null;
    })
  })
}