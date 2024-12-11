import axiosInstance from "./axiosInstance";

const UserService = {
  getUserSimpleData: async () => {
    return await axiosInstance.get("/users/");
  },
};

export default UserService;
