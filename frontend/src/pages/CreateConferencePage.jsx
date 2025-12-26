import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createConference } from "../services/conferenceService";
// 1. On importe le service Keynote
import { getAllKeynotes } from "../services/keynoteService";

const CreateConferencePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  // 2. État pour stocker la liste des speakers récupérés du backend
  const [keynotes, setKeynotes] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    type: "Academic",
    date: "",
    duration: 60,
    keynoteId: "" // On laisse vide au début pour forcer le choix
  });

  // 3. Au chargement de la page, on va chercher les Keynotes
  useEffect(() => {
    const fetchKeynotes = async () => {
      try {
        const data = await getAllKeynotes();
        setKeynotes(data);
        
        // Optionnel : Sélectionner automatiquement le premier de la liste
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
      alert("Erreur lors de la création.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 flex justify-center items-center">
      <div className="max-w-lg w-full bg-white rounded-2xl p-8 border border-slate-100 shadow-xl">
        
        <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-slate-900">New Conference</h1>
            <p className="text-slate-500 mt-2">Organize a new event for the community</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Conference Title</label>
            <input
              type="text"
              name="title"
              required
              placeholder="Ex: Advanced Kubernetes Security"
              className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none"
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          {/* Type & Date */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Type</label>
              <select
                name="type"
                className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
                value={formData.type}
                onChange={handleChange}
              >
                <option value="Academic">Academic</option>
                <option value="Commercial">Commercial</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Date</label>
              <input
                type="date"
                name="date"
                required
                className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none"
                value={formData.date}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Duration & Keynote (Select) */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Duration (min)</label>
              <input
                type="number"
                name="duration"
                min="15"
                step="15"
                className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none"
                value={formData.duration}
                onChange={handleChange}
              />
            </div>
            
            {/* 4. LE MENU DÉROULANT DES SPEAKERS */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Keynote Speaker</label>
              <select
                name="keynoteId"
                required
                className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
                value={formData.keynoteId}
                onChange={handleChange}
              >
                <option value="">Select a speaker</option>
                {/* On boucle sur la liste récupérée du backend */}
                {keynotes.map((keynote) => (
                    <option key={keynote.id} value={keynote.id}>
                        {keynote.firstName} {keynote.lastName}
                    </option>
                ))}
              </select>
            </div>
          </div>

          <div className="pt-4 flex flex-col gap-3">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
            >
              {loading ? "Creating..." : "Create Conference"}
            </button>
            <button type="button" onClick={() => navigate("/")} className="w-full py-3 text-slate-500 font-semibold hover:text-slate-800">
                Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateConferencePage;