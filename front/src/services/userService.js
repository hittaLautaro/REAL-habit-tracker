import axiosInstance from "../services/axiosInstance.js";

const UserService = {
  getUserSimpleData: async () => {
    try {
      console.log("=== UserService.getUserSimpleData called ===");

      // Check if token exists before making request
      const token = localStorage.getItem("jwtToken");
      console.log(
        "Token in localStorage:",
        token ? `${token.substring(0, 20)}...` : "No token"
      );

      console.log("Making request to /users/");
      const response = await axiosInstance.get("/users/");

      console.log("UserService response:", response.status, response.data);
      return response;
    } catch (error) {
      console.error("=== UserService.getUserSimpleData ERROR ===");
      console.error("Error status:", error.response?.status);
      console.error("Error data:", error.response?.data);
      console.error("Error message:", error.message);
      console.error("Full error:", error);
      throw error;
    }
  },
};

export default UserService;
