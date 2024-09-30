import axios from 'axios';
import './OrderButton.css'
// eslint-disable-next-line react/prop-types
const OrderButton = ({ items, totalAmount, user }) => {
    const handleOrderNow = async () => {
        const token = localStorage.getItem('authToken');



        try {
            // eslint-disable-next-line no-unused-vars
            const response = await axios.post(
                `${window.location.origin}/api/orders`,
                {
                    // eslint-disable-next-line react/prop-types
                    user: user._id,
                    items,
                    totalAmount,

                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );
            alert('Order placed successfully!');
        } catch (error) {
            console.error('Error placing order:', error.response || error.message);
            alert('Failed to place order.');
        }
    };


    return (
        <button className="order-now-btn" onClick={handleOrderNow}>
            Order Now
        </button>
    );
};

export default OrderButton;
