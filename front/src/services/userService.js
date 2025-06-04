import axiosInstance from "../services/axiosInstance.js";

const UserService = {
  getUserSimpleData: async () => {
    try {
      const response = await axiosInstance.get("/users/");
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default UserService;
