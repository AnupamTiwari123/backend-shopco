const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderControllers.controller');

router.post('/', orderController.createOrder);

router.get('/user/:userId', orderController.getOrdersByUser);

router.get('/:orderId', orderController.getOrderById);

router.put('/:orderId', orderController.updateOrderStatus);

router.delete('/:orderId', orderController.deleteOrder);

module.exports = router;
