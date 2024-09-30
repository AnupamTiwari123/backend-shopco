
const express = require('express');
const { authMiddleware } = require('../middleware/auth.Middleware');
const {getWishlist,addToWishlist ,deleteFromWishlist} =require('../controllers/wishlistControllers.controller')
const router = express.Router();

router.get('/', authMiddleware, getWishlist);

router.post('/', authMiddleware, addToWishlist);

router.delete('/:id', authMiddleware, deleteFromWishlist);

module.exports = router;
