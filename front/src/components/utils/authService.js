import axiosInstance from "./axiosInstance";

const UserService = {
  login: async (user) => {
    const response = await axiosInstance.post("/auth/authenticate", user);
    localStorage.setItem('jwtToken', response.data.accessToken)
    return response;
  },

  register: async (user) => {
    return await axiosInstance.post("/auth/register", user);;
  },

  logout: async () => {
    await axiosInstance.post("/auth/logout");
  },

  refreshToken: async () => {
    const response = await axiosInstance.post('/auth/refresh');
    localStorage.setItem('jwtToken', response.data.accessToken)
    return response;
  }
};

export default UserService;