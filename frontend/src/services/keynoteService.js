import api from "./api"; 

const SERVICE_PATH = "/KEYNOTE-SERVICE/api/keynotes";

export const getAllKeynotes = async () => {
   const response = await api.get(SERVICE_PATH);
   return response.data;
};

export const createKeynote = async (keynoteData) => {
   const response = await api.post(SERVICE_PATH, keynoteData);
   return response.data;
};