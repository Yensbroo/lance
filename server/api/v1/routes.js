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
const categoryController = require('./controllers/categoryController');
const bidController = require('./controllers/bidController');
const passResetController = require('./controllers/passResetController');

/**
 * Authentication
 */

router.post('/register', authController.create_user);
router.post('/login', authController.user_login);
router.post('/verify/:id', authController.confirm_user);

/**
 * Password resets
 */
router.delete('/deny_reset/:token', passResetController.deny_reset);
router.post('/reset_request', passResetController.reset_request);
router.post('/reset_password/:token', passResetController.reset_password);

/**
 * Projects
 */

// get All projects

// get project by id
router.get('/project/:id', projectController.get_project_by_id)
router.get('/projects', projectController.get_projects)
router.get('/projects/user', authenticate, projectController.get_projects_by_user);
router.delete('/project/:id', authenticate, projectController.delete_project);
router.put('/project/:id', authenticate, projectController.publish_unpublish_project);

/**
 * Categories
 */
router.get('/categories', categoryController.get_categories);
router.get('/categories/topic/:slug', categoryController.get_projects_by_category);

/**
 * Bids
 */
router.get('/bids/:projectId', bidController.get_bids_by_project);
router.delete('/bid/:id', authenticate, bidController.delete_bid);

/**
 * roles
 */


module.exports = router;