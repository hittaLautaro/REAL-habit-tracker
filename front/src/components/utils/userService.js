import axios from "axios";

const API_START = "http://localhost:8080";

let inMemoryAccessToken = null;

const axiosInstance = axios.create({
  baseURL: API_START,
  withCredentials: true
});

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

    if (originalRequest.url.includes('/auth/')) {
      return Promise.reject(error);
    }

    if ((error.response?.status === 401 || error.response?.status === 403) 
        && inMemoryAccessToken 
        && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        console.log("Attempting token refresh...");
        const response = await axiosInstance.post('/auth/refresh');

        const { jwtToken } = response.data.accessToken;
        if (!accessToken) {
          throw new Error("No access token received from refresh.");
        }

        inMemoryAccessToken = jwtToken;
        originalRequest.headers['Authorization'] = `Bearer ${jwtToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token invalid or expired:", refreshError);
        
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
  login: async (user) => {
    const response = await axiosInstance.post("/auth/authenticate", user);
    inMemoryAccessToken = response.data.accessToken;
    return response;
  },
  register: async (user) => {
    const response = await axiosInstance.post("/auth/register", user);
    window.location.href = '/auth/login';
    return response;
  },
  logout: async () => {
    await axiosInstance.post("/auth/logout");
    inMemoryAccessToken = null;
  },
  isAuthenticated: () => {
    return !!inMemoryAccessToken;
  },
  refreshToken: async () => {
    const response = await axiosInstance.post('/auth/refresh');
    inMemoryAccessToken = response.data.accessToken;
    return response;
  }
};

export default UserService;