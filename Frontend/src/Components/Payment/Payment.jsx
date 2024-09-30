
import  { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import './Payment.css'
// eslint-disable-next-line react/prop-types
const Payment = ({ orderDetails }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handlePayment = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (!stripe || !elements) {
            setLoading(false);
            return;
        }

        const cardElement = elements.getElement(CardElement);

        try {
            // Create a payment intent on the server
            const { data } = await axios.post(`${window.location.origin}/api/payment`, {
                // eslint-disable-next-line react/prop-types
                amount: orderDetails.totalAmount * 100, 
                currency: 'usd',
            });

            const { clientSecret } = data;

       
            const paymentResult = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                },
            });

            if (paymentResult.error) {
                setError(paymentResult.error.message);
            } else {
       
                if (paymentResult.paymentIntent.status === 'succeeded') {
                    setSuccess(true);
     
                    await axios.post('http://localhost:3000/api/orders', {
                        // eslint-disable-next-line react/prop-types
                        userId: orderDetails.userId,
                        // eslint-disable-next-line react/prop-types
                        items: orderDetails.items,
                        // eslint-disable-next-line react/prop-types
                        totalAmount: orderDetails.totalAmount,
                    });
                }
            }
        } catch (err) {
            setError('Payment failed. Please try again.',err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="payment">
            <h2>Secure Payment</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success ? (
                <p style={{ color: 'green' }}>Payment successful! Thank you for your purchase.</p>
            ) : (
                <form onSubmit={handlePayment}>
                    <CardElement />
                    <button type="submit" disabled={!stripe || loading}>
                        {loading ? 'Processing...' : 'Pay Now'}
                    </button>
                </form>
            )}
        </div>
    );
};

export default Payment;
