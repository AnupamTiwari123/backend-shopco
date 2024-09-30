import { useEffect, useState } from 'react';
import axios from 'axios';
import './Cart.css';
import OrderButton from '../Orders/OrderButton';

// eslint-disable-next-line react/prop-types
const Cart = ({ user }) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [cartUpdated, setCartUpdated] = useState(false);

    useEffect(() => {
        const fetchCart = async () => {
            if (!user) return;

            try {
                // eslint-disable-next-line react/prop-types
                const response = await axios.get(`http://localhost:3000/api/cart/get/${user._id}`, {
                    withCredentials: true,
                });
                setData(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch cart. Please try again later.',err);
                setLoading(false);
            }
        };

        fetchCart();
    }, [user, cartUpdated]);

    const handleIncreaseQuantity = async (itemId) => {
        try {
            const response = await axios.put(
                // eslint-disable-next-line react/prop-types
                `http://localhost:3000/api/cart/increase/${user._id}`,
                { itemId },
                { withCredentials: true }
            );
            setData(response.data);
            setCartUpdated((prev) => !prev);
        } catch (err) {
            setError('Failed to update cart.',err);
        }
    };

    const handleDecreaseQuantity = async (itemId) => {
        try {
            const response = await axios.put(
                // eslint-disable-next-line react/prop-types
                `http://localhost:3000/api/cart/decrease/${user._id}`,
                { itemId },
                { withCredentials: true }
            );
            setData(response.data);
            setCartUpdated((prev) => !prev);
        } catch (err) {
            setError('Failed to update cart.',err);
        }
    };

    const handleRemoveItem = async (itemId) => {
        try {
            const response = await axios.delete(
                // eslint-disable-next-line react/prop-types
                `http://localhost:3000/api/cart/remove/${user._id}/${itemId}`,
                { withCredentials: true }
            );
            setData(response.data);
            setCartUpdated((prev) => !prev);
        } catch (err) {
            setError('Failed to remove item from cart.',err);
        }
    };

    if (!user) {
        return <p>Please log in to view your cart.</p>;
    }

    if (loading) {
        return <p>Loading cart...</p>;
    }

    return (
        <div className="cart">
            <h2>Your Cart</h2>
            <hr />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {data && data.length > 0 ? (
                <div className="cart-items">
                    <ul>
                        {data[0].items.map((item) => (
                            <li key={item.product}>
                                <img src={item.image} alt={item.name} />
                                <button onClick={() => handleIncreaseQuantity(item.product)} className="qty">+</button>
                                <p>{item.quantity} pcs</p>
                                <button onClick={() => handleDecreaseQuantity(item.product)} disabled={item.quantity <= 1} className="qty">-</button>
                                <p>${Math.round(item.price)}</p>
                                <button onClick={() => handleRemoveItem(item.product)} className="remove"><i className="fa-solid fa-trash"></i></button>
                            </li>
                        ))}
                    </ul>
                    <p>Total: ${data[0].total}</p>
                    <OrderButton items={data[0].items} totalAmount={data[0].total} user={user} />
                </div>
            ) : (
                <p>Your cart is empty.</p>
            )}
        </div>
    );
};

export default Cart;
