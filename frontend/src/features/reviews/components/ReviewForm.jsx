import { useState } from "react";
import StarRatingInput from "../../../components/ui/StartRatingInput";

const ReviewForm = ({ onAddReview }) => {
   const [text, setText] = useState("");
   const [rating, setRating] = useState(5); // 5 étoiles par défaut

   const handleSubmit = (e) => {
      e.preventDefault();
      if (text.trim() === "") return;

      const newReview = {
         date: new Date().toISOString().split('T')[0],
         text: text,
         stars: rating,
      };

      onAddReview(newReview);
      setText("");
      setRating(5);
   };

   return (
      <form onSubmit={handleSubmit} className="bg-slate-50 p-6 rounded-xl border border-slate-200 mt-8">
         <h3 className="text-lg font-bold text-slate-800 mb-4">Write a Review</h3>
         
         <div className="mb-4">
         <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">
            Rating
         </label>
         <StarRatingInput rating={rating} setRating={setRating} />
         </div>

         <div className="mb-4">
         <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">
            Your Feedback
         </label>
         <textarea
            className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            rows="3"
            placeholder="Share your experience with this conference..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
         ></textarea>
         </div>

         {/* Bouton Submit */}
         <div className="text-right">
         <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-sm cursor-pointer"
         >
            Submit Review
         </button>
         </div>
      </form>
  );
};

export default ReviewForm;