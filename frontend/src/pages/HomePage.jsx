import { useConferences } from "../features/conferences/hooks/useConferences";
import ConferenceCard from "../features/conferences/components/ConferenceCard";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { conferences, loading } = useConferences();

  if (loading) {
    return <div className="text-center mt-20 text-slate-400">Loading conferences...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-10 text-center sm:text-left">
          <h1 className="text-3xl font-bold text-slate-900">Events & Conferences</h1>
          <p className="text-slate-500 mt-2">Discover the latest talks from industry experts.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {conferences.map((conf) => (
          <Link key={conf.id} to={`/conferences/${conf.id}`} className="block">
              <ConferenceCard conference={conf} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;