const mongoose = require('mongoose');

const newArrivalsSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    oldPrice: { type: Number, required: true },
    newPrice: { type: Number, required: true },
    image: { type: String, required: true },
    stock: { type: Number, required: true },
    isNewArrival: { type: Boolean, default: true }
});

const NewArrival = mongoose.model('NewArrival', newArrivalsSchema);

module.exports = NewArrival;
