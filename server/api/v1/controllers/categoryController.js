const Category = require('../models').categories;
const Project = require('../models').projects;



exports.get_categories = (req, res) => {
  Category.findAll()
    .then((categories) => {
      res.json(categories)
    })
}

exports.get_projects_by_category = (req, res) => {
  Category.findOne({
    where: {
      slug: req.params.slug
    }
  }).then((category) => {
    Project.findAll({
      where: {
        category_id: category.id
      }
    }).then((projects) => {
      res.json(projects);
    })
  })
}