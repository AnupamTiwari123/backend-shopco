const express = require('express');
const { authMiddleware } = require('../middleware/auth.Middleware');
const { getReview, addReview, editComment } = require('../controllers/reviewControllers.controller');


const router = express.Router();


router.get('/:productId', getReview);

router.post('/:productId', authMiddleware, addReview);

router.put('/:id', authMiddleware, editComment);

module.exports = router;
