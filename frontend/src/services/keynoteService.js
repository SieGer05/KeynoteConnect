import api from "./api"; 

const SERVICE_PATH = "/KEYNOTE-SERVICE/api/keynotes";

export const getAllKeynotes = async () => {
   const response = await api.get(SERVICE_PATH);
   return response.data;
};