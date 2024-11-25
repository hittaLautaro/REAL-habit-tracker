import axios from "axios";

const API_START = "http://localhost:8080/habits";

const axiosInstance = axios.create({
  baseURL: API_START,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});


axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Si la respuesta es 403 te manda al login
axiosInstance.interceptors.response.use(
  (response) => {
    console.log('Response:', response); 
    return response;
  },
  (error) => {
    console.error('Response error:', error.response);
    
    if (error.response?.status === 403) {
      console.log('403 error detected, clearing token'); 
      localStorage.removeItem('jwtToken');
      window.location.href = '/auth/login';
    }
    
    return Promise.reject(error);
  }
);

const habitService = {
  getAll: async () => {
    const response = await axiosInstance.get('/');
    return response.data;
  },

  findById: async (id) => {
    const response = await axiosInstance.get(`/${id}`);
    return response.data;
  },

  save: async (request) => {
    const response = await axiosInstance.post('/', request);
    return response.data;

  },

  update: async (id, request) => {
    const response = await axiosInstance.put(`/${id}`, request);
    return response.data;
  },

  deleteById: async (id) => {
    await axiosInstance.delete(`/${id}`);
  },

};

export default habitService;