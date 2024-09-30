import { useState } from 'react';
import axios from 'axios';
import './ReviewForm.css';
import Cookies from 'js-cookie';
// eslint-disable-next-line react/prop-types
const ReviewForm = ({ productId, user, onReviewAdded }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [error, setError] = useState('');
    // console.log(productId, user, onReviewAdded)
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            setError('You must be logged in to submit a review.');
            return;
        }
        try {
            const token = Cookies.get('authToken');
            await axios.post(
                `${window.location.origin}/api/reviews/${productId}`,
                { rating, comment },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                    withCredentials: true,
                }
            );
            alert('Review added successfully!');
            setRating(0);
            setComment('');
            setError('');
            onReviewAdded();
        } catch (err) {
            console.error('Error adding review', err);
            setError('Failed to submit review. Please try again later.');
        }
    };

    return (
        <form className="review-form" onSubmit={handleSubmit}>
            <h2>Write a Review</h2>
            {error && <p className="error">{error}</p>}
            <label htmlFor="rating">Rating:</label>
            <select
                id="rating"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                required
            >
                <option value={0}>Select a rating</option>
                {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                        {num}
                    </option>
                ))}
            </select>
            <label htmlFor="comment">Comment:</label>
            <textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Your review"
                required
            />
            <button type="submit">Submit Review</button>
        </form>
    );
};

export default ReviewForm;
