import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createConference } from "../services/conferenceService";
import { getAllKeynotes } from "../services/keynoteService";

const CreateConferencePage = () => {
   const navigate = useNavigate();
   const [loading, setLoading] = useState(false);
   const [keynotes, setKeynotes] = useState([]);

   const [formData, setFormData] = useState({
      title: "",
      type: "Academic",
      date: "",
      duration: 60,
      keynoteId: ""
   });

   useEffect(() => {
      const fetchKeynotes = async () => {
         try {
            const data = await getAllKeynotes();
            setKeynotes(data);
            
            if (data.length > 0) {
               setFormData(prev => ({ ...prev, keynoteId: data[0].id }));
            }
         } catch (error) {
            console.error("Impossible de charger les keynotes", error);
         }
      };
      fetchKeynotes();
   }, []);

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
         ...prev,
         [name]: value
      }));
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);

      try {
         await createConference(formData);
         navigate("/");
      } catch (error) {
         console.error(error);
         alert("Erreur lors de la création de la conférence.");
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className="min-h-screen bg-slate-50 py-12 px-4 flex justify-center items-center">
         <div className="max-w-lg w-full bg-white rounded-3xl p-10 border border-slate-100 shadow-2xl shadow-slate-200/50">
            
            <div className="text-center mb-10">
               <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
               </div>
               <h1 className="text-3xl font-black text-slate-900">New Conference</h1>
               <p className="text-slate-500 mt-2">Fill in the details to schedule a new event</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
               {/* Title */}
               <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Conference Title</label>
                  <input
                     type="text"
                     name="title"
                     required
                     placeholder="Ex: Microservices Architecture 2025"
                     className="w-full p-4 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all"
                     value={formData.title}
                     onChange={handleChange}
                  />
               </div>

               {/* Type & Date */}
               <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                     <label className="text-sm font-bold text-slate-700 ml-1">Type</label>
                     <select
                        name="type"
                        className="w-full p-4 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none bg-white transition-all"
                        value={formData.type}
                        onChange={handleChange}
                     >
                        <option value="Academic">Academic</option>
                        <option value="Commercial">Commercial</option>
                     </select>
                  </div>
                  <div className="space-y-2">
                     <label className="text-sm font-bold text-slate-700 ml-1">Date</label>
                     <input
                        type="date"
                        name="date"
                        required
                        className="w-full p-4 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all"
                        value={formData.date}
                        onChange={handleChange}
                     />
                  </div>
               </div>

               {/* Duration & Keynote */}
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                     <label className="text-sm font-bold text-slate-700 ml-1">Duration (min)</label>
                     <input
                        type="number"
                        name="duration"
                        min="15"
                        step="15"
                        className="w-full p-4 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all"
                        value={formData.duration}
                        onChange={handleChange}
                     />
                  </div>
                  
                  <div className="space-y-2">
                     <div className="flex justify-between items-center px-1">
                        <label className="text-sm font-bold text-slate-700">Speaker</label>
                        <button 
                           type="button"
                           onClick={() => navigate("/keynotes/new")}
                           className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer"
                        >
                           + New Speaker
                        </button>
                     </div>
                     <select
                        name="keynoteId"
                        required
                        className="w-full p-4 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none bg-white transition-all"
                        value={formData.keynoteId}
                        onChange={handleChange}
                     >
                        <option value="">Select a speaker</option>
                        {keynotes.map((keynote) => (
                           <option key={keynote.id} value={keynote.id}>
                              {keynote.firstName} {keynote.lastName}
                           </option>
                        ))}
                     </select>
                  </div>
               </div>

               {/* Action Buttons */}
               <div className="pt-6 space-y-3">
                  <button
                     type="submit"
                     disabled={loading}
                     className={`w-full py-4 rounded-2xl font-bold text-white shadow-xl shadow-indigo-200 transition-all active:scale-[0.98] cursor-pointer ${
                        loading 
                        ? "bg-indigo-400 cursor-not-allowed" 
                        : "bg-indigo-600 hover:bg-indigo-700"
                     }`}
                  >
                     {loading ? (
                        <span className="flex items-center justify-center">
                           <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                           </svg>
                           Processing...
                        </span>
                     ) : (
                        "Create Conference"
                     )}
                  </button>
                  <button 
                     type="button" 
                     onClick={() => navigate("/")} 
                     className="w-full py-3 text-slate-500 font-bold hover:text-slate-800 transition-colors cursor-pointer"
                  >
                     Cancel
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
};

export default CreateConferencePage;