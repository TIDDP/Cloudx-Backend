const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Route to initiate GitHub authentication
router.get('/github', authController.redirectToGitHub);

// Route to handle GitHub callback
router.get('/github/callback', authController.handleGitHubCallback);

module.exports = router;
