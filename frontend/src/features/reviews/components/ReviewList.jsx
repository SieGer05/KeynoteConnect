import ReviewItem from "./ReviewItem";

const ReviewList = ({ reviews }) => {
   if (!reviews || reviews.length === 0) {
      return (
         <div className="text-center py-10 bg-slate-50 rounded-xl border border-dashed border-slate-200">
         <p className="text-slate-500 mb-2">No reviews yet.</p>
         <p className="text-sm text-slate-400">Be the first to share your experience!</p>
         </div>
      );
   }

   return (
      <div className="space-y-1">
         {reviews.map((review, index) => (
         <ReviewItem key={index} review={review} />
         ))}
      </div>
   );
};

export default ReviewList;