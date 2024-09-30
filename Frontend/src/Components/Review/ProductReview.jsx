
import { useState, useEffect } from 'react';
import axios from 'axios';
import ReviewList from './ReviewList';
import ReviewForm from './ReviewForm';

// eslint-disable-next-line react/prop-types
const ProductReviewContainer = ({ productId, user }) => {
    const [reviews, setReviews] = useState([]);

    const fetchReviews = () => {
        axios.get(`${window.location.origin}/api/reviews/${productId}`)
            .then(response => setReviews(response.data))
            .catch(error => console.error('Error fetching reviews:', error));
    };

    useEffect(() => {
        fetchReviews();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productId]);

    const handleReviewAdded = () => {
        fetchReviews();
    };
    // console.log(handleReviewAdded)
    return (
        <div>
            <ReviewList reviews={reviews} />
            <ReviewForm productId={productId} user={user} onReviewAdded={handleReviewAdded} />
        </div>
    );
};

export default ProductReviewContainer;
