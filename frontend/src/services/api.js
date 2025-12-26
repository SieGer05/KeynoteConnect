import axios from "axios";
import keycloak from "../keycloak";

const API_URL = "http://localhost:8888"; 

const api = axios.create({
   baseURL: API_URL,
   headers: {
      "Content-Type": "application/json",
   },
});

api.interceptors.request.use(
   async (config) => {
      if (keycloak.authenticated && keycloak.token) {
         try {
            await keycloak.updateToken(30);
            config.headers.Authorization = `Bearer ${keycloak.token}`;
         } catch (error) {
            console.log("Erreur de refresh token", error);
            keycloak.logout();
         }
      }
      return config;
   },
   (error) => {
      return Promise.reject(error);
   }
);

export default api;