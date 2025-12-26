import api from "./api";

export const getAllConferences = async () => {
   const response = await api.get("/conferences");
   return response.data;
};

export const getConferenceById = async (id) => {
   const response = await api.get(`/conferences/${id}`);
   return response.data;
};

export const createConference = async (conferenceData) => {
   const response = await api.post("/conferences", conferenceData);
   return response.data;
};

export const addReview = async (conferenceId, review) => {
   const response = await api.post(`/conferences/${conferenceId}/reviews`, review);
   return response.data;
};