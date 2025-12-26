import { Navigate } from "react-router-dom";
import keycloak from "../../keycloak";

const PrivateRoute = ({ children, roles = [] }) => {
   if (!keycloak.authenticated) {
      return <Navigate to="/" replace />;
   }

   if (roles.length > 0) {
      const hasRole = roles.some((role) => keycloak.hasRealmRole(role));
      
      if (!hasRole) {
         console.warn("Accès refusé : Rôle insuffisant.");
         return <Navigate to="/" replace />;
      }
   }

   return children;
};

export default PrivateRoute;