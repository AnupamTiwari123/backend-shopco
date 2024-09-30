// src/components/Orders.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Payment from '../Payment/Payment';
import './Orders.css';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const params = useParams();

    useEffect(() => {
        const fetchOrders = async () => {
            const token = localStorage.getItem('authToken');
            try {
                const response = await axios.get(`${window.location.origin}/api/orders/user/${params.id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                setOrders(response.data);
            } catch (err) {
                setError('Failed to fetch orders.',err);
            } finally {
                setLoading(false);
            }
        };

        if (params.id) {
            fetchOrders();
        }
    }, [params.id]);

    if (!params.id) {
        return <p>Please log in to view your orders.</p>;
    }

    if (loading) {
        return <p>Loading orders...</p>;
    }

    return (
        <div className="orders">
            <h2>Your Orders</h2>
            <hr />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {orders.length > 0 ? (
                <ul>
                    {orders.map((order) => (
                        <li key={order._id}>
                            <p>Placed At: {new Date(order.placedAt).toLocaleString()}</p>
                            <ul>
                                {order.items.map((item) => (
                                    <li key={item.product}>
                                        <p className="order-id">Order ID: {order._id}</p>
                                        <img src={item.image} alt={item.productName} />
                                        <p>{item.productName}</p>
                                        <p>Quantity: {item.quantity}</p>
                                        <p className="order-total">Total: ${order.totalAmount}</p>
                                        <p className="order-status">Status: {order.orderStatus}</p>
                                    </li>
                                ))}
                            </ul>
                            <button onClick={() => setSelectedOrder(order)}>Pay Now</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>You have no orders.</p>
            )}
            {selectedOrder && <Payment orderDetails={selectedOrder} />}
        </div>
    );
};

export default Orders;
