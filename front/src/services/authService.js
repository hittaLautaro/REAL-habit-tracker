import axiosInstance from "./axiosInstance";

const AuthService = {
  login: async (user) => {
    const response = await axiosInstance.post("/auth/authenticate", user);
    localStorage.setItem("jwtToken", response.data.accessToken);
    return response;
  },

  register: async (user) => {
    return await axiosInstance.post("/auth/register", user);
  },

  logout: async () => {
    await axiosInstance.post("/auth/logout");
  },

  verify: async (req) => {
    await axiosInstance.post("/auth/verify", req);
  },

  resend: async (req) => {
    await axiosInstance.post("/auth/resend", req);
  },

  changePassword: async (user) => {
    return await axiosInstance.patch("/auth/change-password", user);
  },

  refreshToken: async () => {
    const response = await axiosInstance.post("/auth/refresh");
    localStorage.setItem("jwtToken", response.data.accessToken);
    return response;
  },
};

export default AuthService;
