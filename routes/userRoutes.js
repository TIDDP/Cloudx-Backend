const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // Adjusted path
const authenticate = require('../middleware/authenticate'); // Adjusted path

// Register a new user
router.post('/register', userController.register);

// Login user
router.post('/login', userController.login);

// Forgot password
router.post('/forgot-password', userController.forgotPassword);

// Reset password
router.post('/reset-password/:token', userController.resetPassword);

// Update user profile (protected route)
router.put('/profile', authenticate, userController.updateProfile);

module.exports = router;
