import axiosInstance from "./axiosInstance";

const habitService = {
  getAll: async () => {
    return await axiosInstance.get('/habits/');
  },

  findById: async (id) => {
    return await axiosInstance.get(`/habits/${id}`);
  },

  save: async (request) => {
    return await axiosInstance.post('/habits/', request);
  },

  update: async (id, request) => {
    return await axiosInstance.put(`/habits/${id}`, request);
  },

  deleteById: async (id) => {
    await axiosInstance.delete(`/habits/${id}`);
  },
};

export default habitService;