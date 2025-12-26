import { Link } from "react-router-dom";

const Navbar = () => {
  return (
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
               <div className="flex items-center">
               {/* Logo / Titre */}
               <Link to="/" className="flex items-center">
                  <span className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
                     SieGerConf
                  </span>
               </Link>
               </div>
               
               {/* Menu Droite */}
               <div className="flex items-center space-x-4">
               <Link to="/" className="text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors">
                  Conferences
               </Link>
               <button className="bg-indigo-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200">
                  Login
               </button>
               </div>
            </div>
         </div>
      </nav>
   );
};

export default Navbar;