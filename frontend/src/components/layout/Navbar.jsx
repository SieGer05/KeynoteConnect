import { Link } from "react-router-dom";
import logoImg from "../../assets/logo.png";
import { PlusIcon } from "@radix-ui/react-icons";
import keycloak from "../../keycloak";
import { useState, useEffect } from "react";

const Navbar = () => {
   const [, setForceUpdate] = useState(0);

   useEffect(() => {
      keycloak.onAuthSuccess = () => setForceUpdate(n => n + 1);
      keycloak.onAuthLogout = () => setForceUpdate(n => n + 1);
   }, []);

   const username = keycloak.tokenParsed?.given_name || keycloak.tokenParsed?.preferred_username;
   const isAdmin = keycloak.hasRealmRole("ADMIN"); 

   return (
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
               <div className="flex items-center">
                  <Link to="/" className="flex items-center">
                     <img 
                        src={logoImg} 
                        alt="Logo" 
                        className="h-10 w-auto object-contain"
                     />
                  </Link>
               </div>
               
               <div className="flex items-center space-x-4">
                  <Link to="/" className="text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors">
                     Conferences
                  </Link>

                  {keycloak.authenticated ? (
                     <>
                        <div className="flex items-center gap-2 whitespace-nowrap">
                           <span className="text-slate-600 text-sm font-medium hidden sm:block">
                              👋 {username}
                           </span>
                        </div>

                        {isAdmin && (
                           <Link to="/conferences/new">
                              <button className="bg-indigo-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200 flex items-center cursor-pointer">
                                 <PlusIcon className="w-4 h-4 mr-2 scale-110" />
                                 <span>New Conference</span>
                              </button>
                           </Link>
                        )}

                        <button 
                              onClick={() => keycloak.logout()}
                              className="text-slate-500 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer"
                        >
                              Logout
                        </button>
                     </>
                  ) : (
                     <button 
                        onClick={() => keycloak.login()}
                        className="bg-indigo-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200 cursor-pointer"
                     >
                        Login
                     </button>
                  )}
               </div>
            </div>
         </div>
      </nav>
   );
};

export default Navbar;