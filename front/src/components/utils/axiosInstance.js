import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true 
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwtToken');
    
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

    if ((error.response?.status === 401 || error.response?.status === 403) && !originalRequest._retry) {
      originalRequest._retry = true;

       try {
        const response = await axios.post(
          'http://localhost:8080/auth/refresh', 
          {},
          {
            withCredentials: true 
          }
        );

        localStorage.setItem('jwtToken', response.data.accessToken)

        return axiosInstance(originalRequest);
       } catch (refreshError) {
         window.location.href = '/auth/login'; // Refresh token expirado
         return Promise.reject(refreshError);
        }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;