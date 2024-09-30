/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import './Wishlist.css';

const Wishlist = ({ user }) => {
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchWishlist = async () => {
            if (!user) return;

            const token = Cookies.get('authToken');
            try {
                const response = await axios.get(`${window.location.origin}/api/wishlist`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                    withCredentials: true,
                });
                setWishlist(response.data);
            } catch (err) {
                setError('Failed to fetch wishlist. Please try again later.',err);
            } finally {
                setLoading(false);
            }
        };

        fetchWishlist();
    }, [user]);

    const handleRemoveFromWishlist = async (wishlistItemId) => {
        const token = Cookies.get('authToken');
        try {
            await axios.delete(`http://localhost:3000/api/wishlist/${wishlistItemId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setWishlist(wishlist.filter((item) => item._id !== wishlistItemId)); 
        } catch (err) {
            setError('Failed to remove item from wishlist. Please try again later.',err);
        }
    };

    if (!user) {
        return <p>Please log in to view your wishlist.</p>;
    }

    if (loading) {
        return <p>Loading wishlist...</p>;
    }
// console.log(wishlist)
    return (
        <div className="wishlist">
            <h2>Your Wishlist</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {wishlist.length > 0 ? (
                <ul>
                    {wishlist[0].products.map((item) => (
                        <li key={item._id}>
                            <img src={item.imageUrl} alt={item.name} />
                            <p>{item.name}</p>
                            <button id="button" onClick={() => handleRemoveFromWishlist(item._id)}>Remove</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Your wishlist is empty.</p>
            )}
        </div>
    );
};

export default Wishlist;
