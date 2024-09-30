const NewArrival = require('../models/newArrivals.model');


exports.getNewproducts= async (req, res) => {
    try {
        const arrivals = await NewArrival.find();
        res.send(arrivals);
    } catch (err) {
        res.status(500).send(err);
    }
};
exports.getNewProductsInfo= async (req, res) => {
    try {
        const product = await NewArrival.findById(req.params.id);
        console.log(product)
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
