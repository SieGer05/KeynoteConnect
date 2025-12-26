import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getConferenceById, addReview, registerToConference } from "../services/conferenceService";
import Badge from "../components/ui/Badge";
import ReviewList from "../features/reviews/components/ReviewList";
import ReviewForm from "../features/reviews/components/ReviewForm";
import keycloak from "../keycloak";

const ConferenceDetailsPage = () => {
   const { id } = useParams();
   const [conference, setConference] = useState(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(false);
   
   const [isRegistered, setIsRegistered] = useState(false);

   useEffect(() => {
      const fetchData = async () => {
         try {
            setLoading(true);
            const data = await getConferenceById(id);
            setConference(data);

            if (keycloak.authenticated) {
               const userId = keycloak.subject; 
               const hasJoined = localStorage.getItem(`joined_${userId}_${id}`);
               if (hasJoined) {
                  setIsRegistered(true);
               }
            }

         } catch (err) {
            console.error("Erreur:", err);
            setError(true);
         } finally {
            setLoading(false);
         }
      };
      fetchData();
   }, [id]);

   const handleRegister = async () => {
      if (!keycloak.authenticated) {
         keycloak.login();
         return;
      }

      try {
         const updatedConf = await registerToConference(id);
         
         setConference(prev => ({
             ...prev,
             registeredCount: updatedConf.registeredCount 
         }));
         setIsRegistered(true);

         const userId = keycloak.subject;
         localStorage.setItem(`joined_${userId}_${id}`, "true");

      } catch (err) {
         console.error(err);
         alert("Erreur lors de l'inscription. Vérifiez le backend.");
      }
   };

   const handleAddReview = async (reviewData) => {
      try {
         const savedReview = await addReview(id, reviewData);
         setConference(prev => ({
            ...prev,
            reviews: [savedReview, ...prev.reviews]
         }));
      } catch (err) {
         alert("Erreur: Impossible d'ajouter l'avis.");
      }
   };

   if (loading) return <div className="text-center mt-20 text-indigo-600">Loading details...</div>;
   if (error || !conference) return <div className="text-center mt-20 text-red-500">Conference not found</div>;

   return (
      <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6">
         <div className="max-w-4xl mx-auto">
            <Link to="/" className="text-indigo-600 font-medium hover:underline mb-6 inline-block">
               &larr; Back to Conferences
            </Link>

            {/* HEADER */}
            <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm mb-6">
               <div className="flex justify-between items-start mb-4">
                  <Badge type={conference.type}>{conference.type}</Badge>
                  <div className="text-right">
                     <div className="text-2xl font-bold text-slate-900">{conference.date}</div>
                     <div className="text-sm text-slate-400 flex items-center justify-end mt-1">
                        <span className="mr-3">{conference.duration} mins</span>
                        
                        {/* COMPTEUR D'INSCRITS */}
                        <span className="flex items-center text-indigo-600 font-semibold bg-indigo-50 px-2 py-0.5 rounded">
                           <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                           {conference.registeredCount}
                        </span>
                     </div>
                  </div>
               </div>
               
               <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-4 gap-4">
                  <h1 className="text-4xl font-extrabold text-slate-900">{conference.title}</h1>
                  
                  {/* BOUTON D'ACTION AVEC LOGIQUE DÉSACTIVÉE */}
                  <button
                     onClick={handleRegister}
                     disabled={isRegistered}
                     className={`px-6 py-3 rounded-xl font-bold text-white shadow-lg transition-all transform flex items-center justify-center shrink-0 ${
                        isRegistered 
                        ? "bg-slate-400 cursor-not-allowed shadow-none" 
                        : "bg-indigo-600 hover:bg-indigo-700 hover:-translate-y-1 shadow-indigo-200 active:scale-95 cursor-pointer" 
                     }`}
                  >
                     {isRegistered ? (
                        <>
                           {/* Icône Check */}
                           <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                           Already Registered
                        </>
                     ) : (
                        "Join Conference"
                     )}
                  </button>
               </div>
               
               {/* KEYNOTE */}
               {conference.keynote ? (
                  <div className="flex items-center space-x-4 mt-6 pt-6 border-t border-slate-50">
                     <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-lg">
                        {conference.keynote.firstName ? conference.keynote.firstName[0] : 'U'}
                        {conference.keynote.lastName ? conference.keynote.lastName[0] : ''}
                     </div>
                     <div>
                        <p className="text-lg font-bold text-slate-800">
                           {conference.keynote.firstName} {conference.keynote.lastName}
                        </p>
                        <p className="text-slate-500">{conference.keynote.email}</p>
                        <p className="text-sm text-indigo-500 font-medium">{conference.keynote.function}</p>
                     </div>
                  </div>
               ) : (
                  <div className="mt-4 p-3 bg-amber-50 text-amber-700 rounded border border-amber-200">
                  Keynote info unavailable
                  </div>
               )}
            </div>

            {/* REVIEWS */}
            <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
               <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-slate-900">Reviews & Feedback</h2>
                  <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold">
                     {conference.reviews ? conference.reviews.length : 0} reviews
                  </span>
               </div>
               
               <ReviewList reviews={conference.reviews || []} />
               {keycloak.authenticated ? (
                  <ReviewForm onAddReview={handleAddReview} />
               ) : (
                  <div className="mt-8 bg-slate-50 rounded-xl p-8 text-center border border-slate-200 border-dashed">
                     <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm text-2xl">
                        💬
                     </div>
                     <h3 className="text-slate-900 font-medium text-lg">Want to share your thoughts?</h3>
                     <p className="text-slate-500 mb-6">You need to be logged in to leave a review.</p>
                  
                     <button 
                           onClick={() => keycloak.login()}
                           className="bg-indigo-600 text-white px-6 py-2 rounded-full font-medium hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200 cursor-pointer"
                     >
                        Login to Review
                     </button>
                  </div>
               )}
            </div>
         </div>
      </div>
   );
};

export default ConferenceDetailsPage;