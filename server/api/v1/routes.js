const express = require('express');
const router = express.Router();


/**
 * Controllers
 */
const projectController = require('./controllers/projectController');


/**
 * Authentication
 */

/**
 * Projects
 */

 // get All projects
router.get('/projects', projectController.get_projects);

// get project by id
router.get('/project/:id', projectController.get_project_by_id)

// get project by user


/**
 * Categories
 */

/**
 * Bids
 */

/**
 * roles
 */


module.exports = router;