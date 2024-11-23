import axios from "axios";

const API_START = "http://localhost:8080/auth";

// Create an axios instance with base configuration
const axiosInstance = axios.create({
  baseURL: API_START,
  withCredentials: true
});

// Add a request interceptor to include the token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  }
);

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       localStorage.removeItem('jwtToken');
//       window.location.href = '/login';
//     }
//     return Promise.reject(error);
//   }
// );

const UserService = {
  getAll: () => {
    return axiosInstance.get("/users");
  },
  getById: (id) => {
    return axiosInstance.get(`/users/${id}`);
  },
  register: (user) => {
    return axiosInstance.post("/register", user);
  },
  login: (user) => {
    return axiosInstance.post("/authenticate", user);
  },
  // Optionally, add a method to check if user is authenticated
  isAuthenticated: () => {
    return localStorage.getItem('jwtToken') !== null;
  },
  // Method to logout and remove token
  logout: () => {
    localStorage.removeItem('jwtToken');
  }
};

export default UserService;