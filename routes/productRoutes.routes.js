const express = require('express');
const { getAllProducts, getProductById } = require('../controllers/productController.controller');

const router = express.Router();

router.get('/', getAllProducts);
router.get('/productinfo/:id', getProductById);



module.exports = router;
