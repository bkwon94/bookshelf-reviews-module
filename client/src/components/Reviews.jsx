import React from 'react';
import EachReview from './EachReview.jsx';

const Reviews = (props) => {
  console.log(props.ratedReviews, 'rated reviews')
  const block = {
    display: 'block',
  };

  if (props.rating === 0 || props.rating === 'a') {
    return (
      <div className="reviews" style={block}>
        {props.reviews.map((review, index) => {
          return (
            <div className="review-container" key={index}>
              <EachReview className="txn-data" userId={review.user_id} users={props.users} rating={review.rating} date={review.date} review={review.review} />
            </div>
          );
        })}
      </div>
    );
  }
  else {
    return (
      <div className="reviews" style={block}>
        {props.ratedReviews.map((review, index) => {
          return (
            <div className="review-container" key={index}>
              <EachReview className="txn-data" userId={review.user_id} users={props.users} rating={review.rating} date={review.date} review={review.review} />
            </div>
          );
        })
        }
      </div>
  );
  }
};

export default Reviews;
