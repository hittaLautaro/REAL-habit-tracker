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

    // Prevent infinite retry loops by checking the refresh endpoint
    if (originalRequest._retry || originalRequest.url.includes('/auth/refresh')) {
      return Promise.reject(error);
    }

    // If error is 401 or 403, try refreshing the token
    if (error.response?.status === 401 || error.response?.status === 403) {
      originalRequest._retry = true; // Mark request as retried

      try {
        console.log("Attempting token refresh...");
        const response = await axiosInstance.post('/auth/refresh');

        const { accessToken } = response.data;
        if (!accessToken) {
          throw new Error("No access token received from refresh.");
        }

        // Update the in-memory token and retry the original request
        inMemoryAccessToken = accessToken;
        console.log("New token received: ", accessToken);

        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
        console.log("Retrying original request...");
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token invalid or expired:", refreshError);

        
          console.log("Redirecting to login due to revoked token...");
          UserService.logout();
          window.location.href = '/auth/login';

        return Promise.reject(refreshError); // Fail gracefully
      }
    }

    return Promise.reject(error); // Return other errors as-is
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
    const response = await axiosInstance.post("/register", user);

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