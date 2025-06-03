import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

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
      "/auth/refresh",
      "/account/delete",
      "/account/verify",
      "/account/resend",
    ];

    const isPublic = publicPaths.includes(config.url);

    // Add debug logging
    console.log("Request to:", config.url, "Is public:", isPublic);

    if (!isPublic) {
      const token = localStorage.getItem("jwtToken");
      console.log("Token for request:", token ? "Token present" : "No token");

      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
        console.log("Authorization header set");
      } else {
        console.log("No token available for protected route");
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => {
    console.log("Response received:", response.status, response.config.url);
    return response;
  },
  async (error) => {
    console.log("Response error:", error.response?.status, error.config?.url);

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
