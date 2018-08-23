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
const profileController = require('./controllers/profileController');
const reviewController = require('./controllers/reviewController');

/**
 * Authentication
 */

router.post('/register', authController.create_user);
router.post('/login', authController.user_login);
router.post('/verify/:id', authController.confirm_user);
router.post('/user', authenticate, authController.update_user);

/**
 * user
 */


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
router.post('/projects/publish', authenticate, projectController.create_and_publish_project);
router.post('/projects/save', authenticate, projectController.create_and_save_project);
router.delete('/project/:id', authenticate, projectController.delete_project);
router.put('/project/publish_unpublish/:id', authenticate, projectController.publish_unpublish_project);
router.put('/project/update/:id', authenticate, projectController.update_project);

/**
 * Categories
 */
router.get('/categories', categoryController.get_categories);
router.get('/categories/topic/:slug', categoryController.get_projects_by_category);

/**
 * Bids
 */
router.get('/bids/:projectId', bidController.get_bids_by_project);
router.post('/bid/:projectId', authenticate, bidController.create_bid);
router.delete('/bid/:id', authenticate, bidController.delete_bid);

/**
 * Profiles
 */
router.get('/profile/:userId', profileController.get_profile_by_id);
router.put('/profile', authenticate, profileController.edit_profile);
router.post('/profiles', authenticate, profileController.create_profile);

/**
 * Reviews
 */
router.post('/review/:profileId', authenticate, reviewController.create_review);
router.get('/reviews/:profileId', reviewController.get_reviews_by_profile);
router.delete('/review/:id', authenticate, reviewController.delete_review)

module.exports = router;