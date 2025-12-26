import { useParams, Link } from "react-router-dom"
import { MOCK_CONFERENCES } from "../utils/mockData"
import Badge from "../components/ui/Badge"
import StarRating from "../components/ui/StartRating"

const ConferenceDetailsPage = () => {
   const { id } = useParams();
   const conference = MOCK_CONFERENCES.find((c) => c.id === parseInt(id));

   if (!conference) {
      return <div className="text-center mt-20">Conference not found</div>;
   }

   return (
      <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6">
         <div className="max-w-4xl mx-auto">
            {/* Bouton Retour */}
            <Link to="/" className="text-indigo-600 font-medium hover:underline mb-6 inline-block">
               &larr; Back to Conferences
            </Link>

            {/* En-tête de la Conférence */}
            <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm mb-6">
               <div className="flex justify-between items-start mb-4">
                  <Badge type={conference.type}>{conference.type}</Badge>
                  <div className="text-right">
                     <div className="text-2xl font-bold text-slate-900">{conference.date}</div>
                     <div className="text-sm text-slate-400">{conference.duration} mins</div>
                  </div>
               </div>
                  
               <h1 className="text-4xl font-extrabold text-slate-900 mb-4">{conference.title}</h1>
               
               <div className="flex items-center space-x-4 mt-6 pt-6 border-t border-slate-50">
                  <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-lg">
                     {conference.keynote.firstName[0]}{conference.keynote.lastName[0]}
                  </div>
                  <div>
                     <p className="text-lg font-bold text-slate-800">
                        {conference.keynote.firstName} {conference.keynote.lastName}
                     </p>
                     <p className="text-slate-500">{conference.keynote.email}</p>
                     <p className="text-sm text-indigo-500 font-medium">{conference.keynote.function}</p>
                  </div>
               </div>
            </div>

            {/* Section Reviews */}
            <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
               <h2 className="text-2xl font-bold text-slate-900 mb-6">Reviews & Feedback</h2>
               
               {/* Liste vide pour l'instant */}
               {conference.reviews.length === 0 ? (
                  <div className="text-center py-10 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                     <p className="text-slate-500 mb-2">No reviews yet.</p>
                     <button className="text-indigo-600 font-semibold hover:underline">
                        Be the first to write a review
                     </button>
                  </div>
               ) : (
                  <div className="space-y-4">
                     {/* On mappera les reviews ici plus tard */}
                  </div>
               )}
            </div>
         </div>
      </div>
   );
};

export default ConferenceDetailsPage