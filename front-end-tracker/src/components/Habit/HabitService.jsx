// src/services/CategoryService.js
import axios from "axios";

const API_URL = "http://localhost:8080/habits"; // Adjust according to your back-end URL

const HabitService = {
  getAll: async () => {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  },
  getById: (id) => {
    return axios.get(`${API_URL}/${id}`);
  },
  create: (habit) => {
    return axios.post(API_URL, habit);
  },
  update: (id, habit) => {
    return axios.put(`${API_URL}/${id}`, habit);
  },
  delete: (id) => {
    return axios.delete(`${API_URL}/${id}`);
  },
};

export default HabitService;
