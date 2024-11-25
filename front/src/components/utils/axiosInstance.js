
// axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true // Important for sending cookies cross-origin
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem('jwtToken');
    
    // If token exists, add to headers
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is due to an unauthorized request
    // and we haven't already tried to refresh
    if ((error.response?.status === 401 || error.response?.status === 403) && !originalRequest._retry) {
      originalRequest._retry = true;

    //   try {
        // Endpoint that uses the refresh token cookie to generate a new access token
        const response = await axios.post(
          'http://localhost:8080/auth/refresh', 
          {}, // Empty body since token is in cookie
          {
            withCredentials: true // Crucial for sending/receiving cookies
          }
        );

        localStorage.setItem('jwtToken', response.data.accessToken)

        // If refresh is successful, retry the original request
        return axiosInstance(originalRequest);
    //   } catch (refreshError) {
    //     // Refresh token is invalid or expired
    //     // Logout the user
    //     window.location.href = '/auth/login';
    //     return Promise.reject(refreshError);
    //   }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;