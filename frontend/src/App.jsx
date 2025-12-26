import { MOCK_CONFERENCES } from "./utils/mockData";
import ConferenceCard from "./features/conferences/components/ConferenceCard";

function App() {
  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Header */}
        <div className="mb-10">
            <h1 className="text-3xl font-bold text-slate-900">Events & Conferences</h1>
            <p className="text-slate-500 mt-2">Discover the latest talks from industry experts.</p>
        </div>

        {/* The Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_CONFERENCES.map((conf) => (
            <ConferenceCard key={conf.id} conference={conf} />
          ))}
        </div>
        
      </div>
    </div>
  );
}

export default App