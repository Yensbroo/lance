const express = require('express');
const router = express.Router();

const passport = require('passport');

/**
 * passport authentication
 */
const authenticate = passport.authenticate('jwt', {
  session: false
});
/**
 * Controllers
 */
const authController = require('./controllers/authController');
const projectController = require('./controllers/projectController');

/**
 * Models
 */



/**
 * Authentication
 */

router.post('/register', authController.create_user);
router.post('/login', authController.user_login);
router.post('/verify/:id', authController.confirm_user);


/**
 * Projects
 */

// get All projects

// get project by id
router.get('/project/:id', projectController.get_project_by_id)
router.get('/projects', projectController.get_projects)
router.get('/projects/user', authenticate, projectController.get_projects_by_user);
router.delete('/project/:id', authenticate, projectController.delete_project);

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