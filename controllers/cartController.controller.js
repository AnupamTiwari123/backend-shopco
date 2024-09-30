const Cart = require('../models/cart.model');
const Product = require('../models/products.model');
const NewArrival = require('../models/newArrivals.model');
exports.addToCart = async (req, res) => {
    const { userId, productId, quantity, image } = req.body;
    // console.log(userId, productId, quantity, image)

    try {
        let product = await NewArrival.findById(productId);
        if (!product) {
            product = await Product.findById(productId);
        }
        console.log(product)
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            cart = new Cart({ user: userId, items: [], total: 0 });
        }
        // console.log("product", product)
        // console.log("product", product.image)

        const existingItemIndex = cart.items.findIndex(item => item.product.toString() === productId);
        if (existingItemIndex > -1) {
            cart.items[existingItemIndex].quantity += quantity;
        } else {
            cart.items.push({
                product: productId,
                quantity,
                image: image,
                price: product.price ? product.price : product.newPrice
            });
        }

        cart.total = cart.items.reduce((acc, item) => acc + (item.quantity * item.price), 0);

        await cart.save();
        res.status(200).json({ message: 'Product added to cart', cart });
    } catch (error) {
        console.error(error);
        // console.log("hello")
        res.status(500).json({ message: 'Error adding product to cart', error });
    }
};
exports.increaseQty = async (req, res) => {
    const userId = req.params.id;
    const { itemId } = req.body;

    try {
        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const item = cart.items.find((item) => item.product.toString() === itemId);
        if (!item) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }

        item.quantity += 1;

        // Recalculate the total
        cart.total = cart.items.reduce((acc, item) => acc + (item.quantity * item.price), 0);

        await cart.save();
        res.json(cart);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};


exports.decreaseQty = async (req, res) => {
    const userId = req.params.id;
    const { itemId } = req.body;

    try {
        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const item = cart.items.find((item) => item.product.toString() === itemId);
        if (!item) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }

        if (item.quantity > 1) {
            item.quantity -= 1;
        } else {
            return res.status(400).json({ message: 'Cannot decrease quantity below 1' });
        }

        // Recalculate the total
        cart.total = cart.items.reduce((acc, item) => acc + (item.quantity * item.price), 0);

        await cart.save();
        res.json(cart);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};


exports.removeFromCart = async (req, res) => {
    const { userId, itemId } = req.params;
    try {
        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Filter out the removed item
        cart.items = cart.items.filter((item) => item.product.toString() !== itemId);

        // Recalculate the cart total
        cart.total = cart.items.reduce((acc, item) => acc + (item.quantity * item.price), 0);

        await cart.save();
        res.json(cart); // Return the updated cart, including the new total
    } catch (err) {
        res.status(500).json({ message: 'Failed to remove item', error: err.message });
    }
};

