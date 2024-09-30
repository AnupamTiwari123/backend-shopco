import { useState } from 'react';
import './ReviewList.css';

// eslint-disable-next-line react/prop-types
const ReviewList = ({ reviews, onEdit }) => {
    const [editingReviewId, setEditingReviewId] = useState(null);
    const [editedComment, setEditedComment] = useState('');

    const handleEditClick = (review) => {
        setEditingReviewId(review._id);
        setEditedComment(review.comment);
    };

    const handleSaveEdit = async (reviewId) => {
        if (editedComment.trim() === '') {
            alert('Comment cannot be empty.');
            return;
        }

        await onEdit(reviewId, editedComment);
        setEditingReviewId(null);
        setEditedComment('');
    };

    return (
        <div className="review-list">
            <h2>Customer Reviews</h2>
            {/* eslint-disable-next-line react/prop-types */}
            {reviews.length > 0 ? (
                // eslint-disable-next-line react/prop-types
                reviews.map(review => (
                    <div className="review-item" key={review._id}>
                        <h4>{review.user.name}</h4>
                        <div className="review-rating">
                            {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                        </div>
                        {editingReviewId === review._id ? (
                            <div>
                                <textarea
                                    value={editedComment}
                                    onChange={(e) => setEditedComment(e.target.value)}
                                    placeholder="Edit your review"
                                />
                                <button onClick={() => handleSaveEdit(review._id)}>Save</button>
                                <button onClick={() => setEditingReviewId(null)}>Cancel</button>
                            </div>
                        ) : (
                            <div>
                                <p>{review.comment}</p>
                                <button onClick={() => handleEditClick(review)}>Edit Comment</button>
                            </div>
                        )}
                        <p className="review-date">{new Date(review.date).toLocaleDateString()}</p>
                    </div>
                ))
            ) : (
                <p>No reviews yet. Be the first to review this product!</p>
            )}
        </div>
    );
};

export default ReviewList;
