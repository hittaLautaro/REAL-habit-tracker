import axiosInstance from "./axiosInstance";

const AuthService = {
  login: async (user) => {
    const response = await axiosInstance.post("/auth/authenticate", user);
    return response;
  },

  register: async (user) => {
    return await axiosInstance.post("/auth/register", user);
  },

  logout: async () => {
    await axiosInstance.post("/auth/logout");
  },

  verify: async (token) => {
    await axiosInstance.post(`/account/verify?token=${token}`);
  },

  delete: async (token) => {
    await axiosInstance.post(`/account/delete?token=${token}`);
  },

  resendVerificationEmail: async (token) => {
    await axiosInstance.post(`/account/resend?token=${token}`);
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
