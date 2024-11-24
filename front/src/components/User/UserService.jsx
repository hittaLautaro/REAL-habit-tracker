import axios from "axios";

const API_START = "http://localhost:8080";

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

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Don't try to refresh for auth endpoints
    if (originalRequest.url.includes('/auth/')) {
      return Promise.reject(error);
    }

    // Only try to refresh if we had a token to begin with
    if ((error.response?.status === 401 || error.response?.status === 403) 
        && inMemoryAccessToken 
        && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        console.log("Attempting token refresh...");
        const response = await axiosInstance.post('/auth/refresh');

        const { accessToken } = response.data;
        if (!accessToken) {
          throw new Error("No access token received from refresh.");
        }

        inMemoryAccessToken = accessToken;
        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token invalid or expired:", refreshError);
        
        // Only logout if we were previously authenticated
        if (inMemoryAccessToken) {
          console.log("Logging out due to invalid refresh token...");
          await UserService.logout();
          window.location.href = '/auth/login';
        }

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
  register: async (user) => {
    const response = await axiosInstance.post("/auth/register", user);

    window.location.href = '/auth/login';

    return response;
  },
  login: async (user) => {
    try {
      const response = await axiosInstance.post("/auth/authenticate", user);
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
      await axiosInstance.post("/auth/logout");
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
      const response = await axiosInstance.post('/auth/refresh');
      inMemoryAccessToken = response.data.accessToken;
      return response;
    } catch (error) {
      console.error('Token refresh error:', error);
      throw error;
    }
  }
};

export default UserService;