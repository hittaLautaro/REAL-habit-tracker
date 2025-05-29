import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const axiosInstance = axios.create({
  baseURL: `${BASE_URL}/api`,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const publicPaths = [
      "/auth/register",
      "/auth/login",
      "/account/delete",
      "/account/verify",
      "/account/resend",
      "/auth/logout",
    ];
    const isPublic = publicPaths.some((path) => config.url.includes(path));

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

    console.log(error);

    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/authenticate") &&
      !originalRequest.url.includes("/auth/register") &&
      !originalRequest.url.includes("/account/verify") &&
      !originalRequest.url.includes("/account/delete") &&
      !originalRequest.url.includes("/account/resend")
    ) {
      originalRequest._retry = true;

      console.log(originalRequest.url);

      try {
        const response = await axios.post(
          `${BASE_URL}/auth/refresh`,
          {},
          {
            withCredentials: true,
          }
        );

        localStorage.setItem("jwtToken", response.data.accessToken);

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        window.location.href = "/auth/login"; // refresh token expired
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
