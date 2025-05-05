import axiosInstance from "./axiosInstance";

const habitService = {
  getAll: async () => {
    return await axiosInstance.get("/habits/");
  },

  findById: async (id) => {
    return await axiosInstance.get(`/habits/${id}`);
  },

  save: async (request) => {
    return await axiosInstance.post("/habits/", request);
  },

  update: async (id, request) => {
    return await axiosInstance.patch(`/habits/${id}`, request);
  },

  updateIsCompleted: async (id, request) => {
    return await axiosInstance.patch(`/habits/${id}/complete`, request);
  },

  updateAll: async (request) => {
    return await axiosInstance.patch(`/habits/`, request);
  },

  deleteById: async (id) => {
    await axiosInstance.delete(`/habits/${id}`);
  },

  deleteAll: async () => {
    await axiosInstance.delete(`/habits/`);
  },
};

export default habitService;
