const express = require('express');
const { addToCart, increaseQty, decreaseQty, removeFromCart } = require('../controllers/cartController.controller');
const mongoose = require('mongoose');
const { authMiddleware } = require('../middleware/auth.Middleware');
const Cart = require('../models/cart.model')
const router = express.Router();

router.post('/add', authMiddleware, addToCart);
router.get('/get/:id', authMiddleware, async (req, res) => {
    // console.log("are you running")
    try {
        const userId = req.params.id;
        console.log(userId)
        const cart = await Cart.find({ user: new mongoose.Types.ObjectId(userId) });
        // console.log("hello my cart", cart)

        if (!cart) {
            console.log(" helloare you running")
            return res.status(404).json({ message: 'Cart not found' });
        }

        return res.status(200).json(cart);
        console.log("Done")

    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
router.put('/increase/:id', authMiddleware, increaseQty)
router.put('/decrease/:id', authMiddleware, decreaseQty)
router.delete('/remove/:userId/:itemId', authMiddleware, removeFromCart)
module.exports = router;
