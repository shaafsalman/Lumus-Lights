import { useState } from "react";
import { Star } from "lucide-react";

const ReviewComponent = ({ heading = "Customer Reviews", reviews = [] }) => {
  const [showReviewForm, setShowReviewForm] = useState(false);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          size={20}
          className={`${
            i <= rating ? "text-yellow-500" : "text-gray-400"
          }`}
        />
      );
    }
    return stars;
  };

  if (reviews.length === 0) {
    return (
      <div className="flex flex-col items-center space-y-4 p-8 border-b">
        {/* Heading */}
        <h2 className="text-xl font-bold tracking-tighter mt-8">{heading}</h2>
        <p className="text-xs">Be the first to write a review</p>
        {/* Divider and Write Review Button */}
        <div className="flex items-center space-x-4">
              {/* Stars and Text */}
        <div className="flex items-center space-x-2">
          {renderStars(0)}
        </div>
          <div className="w-px h-8 bg-gray-500" /> {/* Vertical Divider */}

          <button
            className="bg-[#c5a57d] text-white font-semibold py-2 px-6 rounded-md"
            onClick={() => setShowReviewForm(true)}
          >
            Write a review
          </button>
        </div>
      </div>
    );
  }

  // Render reviews if available
  return (
    <div className="space-y-4 p-8">
      {reviews.map((review, index) => (
        <div key={index} className="flex items-start space-x-4 border-b pb-4">
          {/* Review Image */}
          {review.image ? (
            <img
              src={review.image}
              alt={`Review by ${review.name}`}
              className="w-16 h-16 rounded-lg object-cover"
            />
          ) : (
            <div className="w-16 h-16 rounded-lg bg-gray-300" />
          )}

          {/* Review Content */}
          <div>
            <div className="flex items-center space-x-2">
              {renderStars(review.rating)}
              <span className="text-sm text-gray-500">{review.date}</span>
            </div>
            <p className="font-semibold text-white">{review.name}</p>
            <p className="text-gray-300">{review.comment}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewComponent;
