const { getNewproducts, getNewProductsInfo } = require('../controllers/newArrivalControllers.controller');
const NewArrival = require('../models/newArrivals.model');

const express = require('express');
const router = express.Router();

router.get('/', getNewproducts);
router.get('/productinfo/:id', getNewProductsInfo);
module.exports = router;
