import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { MOCK_CONFERENCES } from "../utils/mockData";
import Badge from "../components/ui/Badge";
import ReviewList from "../features/reviews/components/ReviewList";
import ReviewForm from "../features/reviews/components/ReviewForm";

const ConferenceDetailsPage = () => {
   const { id } = useParams();
   
   // État local pour gérer la conférence et permettre la mise à jour des reviews
   const [conference, setConference] = useState(null);

   useEffect(() => {
      const foundConf = MOCK_CONFERENCES.find((c) => c.id === parseInt(id));
      
      if (foundConf) {
         setConference({ ...foundConf, reviews: [...foundConf.reviews] });
      }
   }, [id]);

   // Fonction pour gérer l'ajout d'une review
   const handleAddReview = (newReview) => {
      const reviewWithId = { ...newReview, id: Date.now() };
      
      setConference(prev => ({
         ...prev,
         reviews: [reviewWithId, ...prev.reviews]
      }));
   };

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
               <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-slate-900">Reviews & Feedback</h2>
                  <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold">
                     {conference.reviews.length} reviews
                  </span>
               </div>
               
               {/* Liste des avis existants */}
               <ReviewList reviews={conference.reviews} />

               {/* Formulaire d'ajout */}
               <ReviewForm onAddReview={handleAddReview} />
            </div>
         </div>
      </div>
   );
};

export default ConferenceDetailsPage;