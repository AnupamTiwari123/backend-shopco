const Order = require('../models/order.model');
const Product = require('../models/products.model')
const NewArrival = require('../models/newArrivals.model');
exports.createOrder = async (req, res) => {
    const { user, items, totalAmount } = req.body;
    console.log(items)

    try {

        const itemsWithNames = await Promise.all(
            items.map(async (item) => {
                let product = await NewArrival.findById(item.product);
                if (!product) {
                    product = await Product.findById(item.product);
                }

                return {
                    ...item,
                    productName: product.name,
                };
            })
        );
        // console.log(itemsWithNames)
        const newOrder = new Order({
            user,
            items: itemsWithNames,
            totalAmount,
            orderStatus: 'Pending',
            placedAt: Date.now(),
        });

        const savedOrder = await newOrder.save();
        res.status(201).json({ message: 'Order created successfully', order: savedOrder });
    } catch (error) {
        console.error('Error in createOrder:', error);
        res.status(500).json({ message: 'Failed to create order', error: error.message });
    }
};

exports.getOrdersByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        console.log(userId)
        const orders = await Order.find({ user: userId }).populate('items.product');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get orders', error });
    }
};

exports.getOrderById = async (req, res) => {
    try {
        const { orderId } = req.params;

        const order = await Order.findById(orderId).populate('items.product');
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get order', error });
    }
};

exports.updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { orderStatus } = req.body;

        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            { orderStatus },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({ message: 'Order status updated successfully', order: updatedOrder });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update order status', error });
    }
};

exports.deleteOrder = async (req, res) => {
    try {
        const { orderId } = req.params;

        const deletedOrder = await Order.findByIdAndDelete(orderId);
        if (!deletedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete order', error });
    }
};
