
const Review = require('../models/review.model');
const Product = require('../models/products.model');
const NewArrival = require('../models/newArrivals.model');



exports.getReview= async (req, res) => {

    try {
        const reviews = await Review.find({ product: req.params.productId }).populate('user', 'name');
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.addReview= async (req, res) => {
    const { rating, comment } = req.body;
    console.log(rating,comment)
    try {
        let product = await Product.findById(req.params.productId);
        if(!product)
        {

            product = await NewArrival.findById(req.params.productId);
        }
        if (!product) return res.status(404).json({ message: 'Product not found' });

        const review = new Review({
            user: req.user.id,
            product: req.params.productId,
            rating,
            comment,
        });

        await review.save();
        res.status(201).json(review);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.editComment = async (req, res) => {
    const { rating, comment } = req.body;
    try {
        const review = await Review.findById(req.params.id);
        if (!review) return res.status(404).json({ message: 'Review not found' });

        if (review.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        review.rating = rating || review.rating;
        review.comment = comment || review.comment;

        await review.save(); // Save the updated review

        res.json(review); // Return the updated review
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
