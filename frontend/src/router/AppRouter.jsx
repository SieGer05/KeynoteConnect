import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ConferenceDetailsPage from "../pages/ConferenceDetailsPage";
import CreateConferencePage from "../pages/CreateConferencePage";
import PrivateRoute from "../components/utils/PrivateRoute";

const AppRouter = () => {
   return (
      <Routes>
         <Route path="/" element={<HomePage />} />
         <Route path="/conferences/:id" element={<ConferenceDetailsPage />} />
         <Route 
            path="/conferences/new" 
            element={
               <PrivateRoute roles={['ADMIN']}>
                  <CreateConferencePage />
               </PrivateRoute>
            } 
         />
         <Route path="*" element={<div className="text-center mt-20">404 - Page Not Found</div>} />
      </Routes>
   );
};

export default AppRouter;