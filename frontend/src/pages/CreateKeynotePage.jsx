import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createKeynote } from "../services/keynoteService";

const CreateKeynotePage = () => {
   const navigate = useNavigate();
   const [loading, setLoading] = useState(false);

   const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      email: "",
      function: ""
   });

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
         await createKeynote(formData);
         navigate("/");
      } catch (err) {
         alert("Error saving keynote");
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className="min-h-screen bg-slate-50 py-10 px-4 flex justify-center items-center">
         <div className="max-w-lg w-full bg-white rounded-2xl p-8 border border-slate-100 shadow-xl">
         
         {/* Header */}
         <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-slate-900">
               New Keynote Speaker
            </h1>
            <p className="text-slate-500 mt-2">
               Add a speaker to your conference lineup
            </p>
         </div>

         <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* First & Last Name */}
            <div className="grid grid-cols-2 gap-6">
               <div>
               <label className="block text-sm font-bold text-slate-700 mb-2">
                  First Name
               </label>
               <input
                  type="text"
                  name="firstName"
                  required
                  className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none"
                  value={formData.firstName}
                  onChange={handleChange}
               />
               </div>

               <div>
               <label className="block text-sm font-bold text-slate-700 mb-2">
                  Last Name
               </label>
               <input
                  type="text"
                  name="lastName"
                  required
                  className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none"
                  value={formData.lastName}
                  onChange={handleChange}
               />
               </div>
            </div>

            {/* Email */}
            <div>
               <label className="block text-sm font-bold text-slate-700 mb-2">
                  Email
               </label>
               <input
                  type="email"
                  name="email"
                  required
                  className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none"
                  value={formData.email}
                  onChange={handleChange}
               />
            </div>

            {/* Function */}
            <div>
               <label className="block text-sm font-bold text-slate-700 mb-2">
                  Function
               </label>
               <input
                  type="text"
                  name="function"
                  required
                  placeholder="Ex: Software Engineer"
                  className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none"
                  value={formData.function}
                  onChange={handleChange}
               />
            </div>

            {/* Actions */}
            <div className="pt-4 flex flex-col gap-3">
               <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 cursor-pointer"
               >
                  {loading ? "Saving..." : "Save Keynote"}
               </button>

               <button
                  type="button"
                  onClick={() => navigate("/")}
                  className="w-full py-3 text-slate-500 font-semibold hover:text-slate-800"
               >
                  Cancel
               </button>
            </div>
         </form>
         </div>
      </div>
   );
};

export default CreateKeynotePage;
