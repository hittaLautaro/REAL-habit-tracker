import axios from "axios";

const BASE_URL = /* "http://localhost:8080" */ import.meta.env.VITE_BACKEND_URL;

const axiosInstance = axios.create({
  baseURL: `${BASE_URL}/api`,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const publicPaths = [
      "/",
      "/auth/register",
      "/auth/login",
      "/auth/logout",
      "/auth/refresh",
      "/account/delete",
      "/account/verify",
      "/account/resend",
    ];

    const isPublic = publicPaths.includes(config.url);

    if (!isPublic) {
      const token = localStorage.getItem("jwtToken");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/")
    ) {
      originalRequest._retry = true;

      try {
        const response = await axiosInstance.post("/auth/refresh", {});
        localStorage.setItem("jwtToken", response.data.accessToken);
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("jwtToken");
        window.location.href = "/auth/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
