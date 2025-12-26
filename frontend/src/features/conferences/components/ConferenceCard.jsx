import Badge from "../../../components/ui/Badge"
import StarRating from "../../../components/ui/StartRating";

const ConferenceCard = ({ conference }) => {
   return (
      <div className="group bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 ease-in-out">
         
         <div className="flex justify-between items-start mb-4">
            <Badge type={conference.type}>{conference.type}</Badge>
            <span className="text-xs text-slate-400 font-medium">
               {conference.date}
            </span>
         </div>

         {/* Body: Title & Keynote */}
         <div className="mb-6">
            <h3 className="text-lg font-bold text-slate-800 mb-2 leading-tight group-hover:text-indigo-600 transition-colors">
               {conference.title}
            </h3>
         
            {/* Keynote Micro-Profile */}
            <div className="flex items-center mt-3">
               <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500 mr-3">
                  {conference.keynote.firstName[0]}{conference.keynote.lastName[0]}
               </div>
               <div>
                  <p className="text-sm font-medium text-slate-700">
                  {conference.keynote.firstName} {conference.keynote.lastName}
                  </p>
                  <p className="text-xs text-slate-400">
                  {conference.keynote.function}
                  </p>
               </div>
            </div>
         </div>

         {/* Footer: Stats & Actions */}
         <div className="flex items-center justify-between pt-4 border-t border-slate-50">
            <StarRating score={conference.score} />
         
            <div className="flex items-center text-slate-400 text-xs font-medium">
               {/* Simple Icon for users */}
               <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
               </svg>
               {conference.registeredCount}
            </div>
         </div>
      </div>
   );
};

export default ConferenceCard;