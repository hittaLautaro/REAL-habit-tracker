// src/services/CategoryService.js
import axios from "axios";

const API_URL = "http://localhost:8080/categories"; // Adjust according to your back-end URL

const CategoryService = {
  getAll: () => {
    return axios.get(API_URL);
  },
  getById: (id) => {
    return axios.get(`${API_URL}/${id}`);
  },
  create: (category) => {
    return axios.post(API_URL, category);
  },
  update: (id, category) => {
    return axios.put(`${API_URL}/${id}`, category);
  },
  delete: (id) => {
    return axios.delete(`${API_URL}/${id}`);
  },
};

export default CategoryService;
