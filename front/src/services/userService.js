import axiosInstance from "../services/axiosInstance.js";

const UserService = {
  getUserSimpleData: async () => {
    return await axiosInstance.get("/users/");
  },
};

export default UserService;
