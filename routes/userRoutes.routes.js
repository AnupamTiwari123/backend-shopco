const express = require('express');
const { getUserDetails, updateUserDetails } = require('../controllers/userController.controller');
const { authMiddleware } = require('../middleware/auth.Middleware');

const router = express.Router();

router.get('/me', authMiddleware, getUserDetails);
router.put('/me', authMiddleware, updateUserDetails);

module.exports = router;
