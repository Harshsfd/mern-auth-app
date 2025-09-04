const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const passwordController = require('../controllers/passwordController');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

// email verification link: GET /api/auth/verify-email?token=...
router.get('/verify-email', authController.verifyEmail);

// forgot/reset
router.post('/forgot-password', passwordController.forgotPassword);
router.post('/reset-password', passwordController.resetPassword); // expects token+id in query

module.exports = router;
