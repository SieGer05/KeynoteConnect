import axios from "axios";

const KEYNOTE_API_URL = "http://localhost:8888/KEYNOTE-SERVICE/api"; 

const api = axios.create({
   baseURL: KEYNOTE_API_URL,
   headers: {
      "Content-Type": "application/json",
   },
});

export const getAllKeynotes = async () => {
   const response = await api.get("/keynotes");
   return response.data;
};