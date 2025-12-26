import StarRating from "../../../components/ui/StartRating";

const ReviewItem = ({ review }) => {
   return (
      <div className="p-4 border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors rounded-lg">
         <div className="flex justify-between items-center mb-2">
         <div className="flex items-center space-x-3">
            {/* Avatar générique */}
            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-500">
               U
            </div>
            <div className="text-sm font-semibold text-slate-700">User</div>
         </div>
         <span className="text-xs text-slate-400">{review.date}</span>
         </div>
         
         <div className="mb-2">
         <StarRating score={review.stars} />
         </div>
         
         <p className="text-slate-600 text-sm leading-relaxed">
         {review.text}
         </p>
      </div>
   );
};

export default ReviewItem;