import api from "./api";

const SERVICE_PATH = "/CONFERENCE-SERVICE/api/conferences";

export const getAllConferences = async () => {
   const response = await api.get(SERVICE_PATH);
   return response.data;
};

export const getConferenceById = async (id) => {
   const response = await api.get(`${SERVICE_PATH}/${id}`);
   return response.data;
};

export const createConference = async (conferenceData) => {
   const response = await api.post(SERVICE_PATH, conferenceData);
   return response.data;
};

export const addReview = async (conferenceId, review) => {
   const response = await api.post(`${SERVICE_PATH}/${conferenceId}/reviews`, review);
   return response.data;
};

export const registerToConference = async (id) => {
   const response = await api.put(`${SERVICE_PATH}/${id}/register`);
   return response.data;
};