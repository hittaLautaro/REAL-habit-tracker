import axios from "axios";

const API_START = "http://localhost:8080/auth";

let inMemoryAccessToken = null;

// Create an axios instance with base configuration
const axiosInstance = axios.create({
  baseURL: API_START,
  withCredentials: true
});

// Add a request interceptor to include the access token
axiosInstance.interceptors.request.use(
  (config) => {
    if (inMemoryAccessToken) {
      config.headers['Authorization'] = `Bearer ${inMemoryAccessToken}`;
      console.log('Request headers:', config.headers);
    }
    return config;
  }
);

// Add a response interceptor to handle token refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the error is 401 and we haven't tried refreshing yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh the token
        const response = await axiosInstance.post('/refresh-token');
        const { accessToken } = response.data;
        
        // Store new access token
        inMemoryAccessToken = accessToken;
        
        // Retry the original request with new token
        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // If refresh fails, logout user
        UserService.logout();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
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
  login: async (user) => {
    try {
      const response = await axiosInstance.post("/authenticate", user);
      console.log('Login response:', response.data); 
      inMemoryAccessToken = response.data.accessToken;
      console.log('Stored token:', inMemoryAccessToken); 
      return response;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  logout: async () => {
    try {
      // Call backend to invalidate refresh token
      await axiosInstance.post("/logout");
      // Clear access token from memory
      inMemoryAccessToken = null;
      // The refresh token cookie will be cleared by the backend
    } catch (error) {
      console.error('Logout error:', error);
    }
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!inMemoryAccessToken;
  },

  // Manually refresh access token if needed
  refreshToken: async () => {
    try {
      const response = await axiosInstance.post('/refresh-token');
      inMemoryAccessToken = response.data.accessToken;
      return response;
    } catch (error) {
      console.error('Token refresh error:', error);
      throw error;
    }
  }
};

export default UserService;