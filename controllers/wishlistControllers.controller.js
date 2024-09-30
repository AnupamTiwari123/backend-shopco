
const Wishlist = require('../models/wishlist.model');
const Product = require('../models/products.model');
const NewArrival = require('../models/newArrivals.model');
exports.getWishlist=async (req, res) => {
    const id = req.user.id;
    console.log(id)
    try {
        const wishlist = await Wishlist.find({ user: id });
        res.json(wishlist);
    } catch (error) {
        console.log("hello are you running")
        res.status(500).json({ message: 'Server error' });
    }
};

exports.addToWishlist= async (req, res) => {
    const { productId, image } = req.body;
console.log(productId,image)
    try {

        let product = await Product.findById(productId);
        if (!product) {
            product = await NewArrival.findById(productId);
        }
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
// console.log(product)

        let wishlist = await Wishlist.findOne({ user: req.user.id });
        if (!wishlist) {
            wishlist = new Wishlist({ user: req.user.id, products: [] });
        }

        const existingProductIndex = wishlist.products.findIndex(item => item.productId.toString() === productId);

        if (existingProductIndex === -1) {

            wishlist.products.push({
                productId,
                name: product.name,
                price: product.price?product.price:product.newPrice,
                imageUrl: image
            });
            await wishlist.save();
            return res.status(201).json(wishlist);
        } else {
            return res.status(400).json({ message: 'Product is already in the wishlist' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.deleteFromWishlist= async (req, res) => {
    try {
        const wishlistItem = await Wishlist.findById(req.params.id);
        if (!wishlistItem) return res.status(404).json({ message: 'Wishlist item not found' });

        if (wishlistItem.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await wishlistItem.remove();
        res.json({ message: 'Item removed from wishlist' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};


