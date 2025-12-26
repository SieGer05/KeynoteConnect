import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ConferenceDetailsPage from "../pages/ConferenceDetailsPage";

const AppRouter = () => {
   return (
      <Routes>
         <Route path="/" element={<HomePage />} />
         <Route path="/conferences/:id" element={<ConferenceDetailsPage />} />
         <Route path="*" element={<div className="text-center mt-20">404 - Page Not Found</div>} />
      </Routes>
   );
};

export default AppRouter;