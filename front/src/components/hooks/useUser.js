import { useQuery } from "@tanstack/react-query";
import UserService from "../../services/userService.js";

export const userKeys = {
  current: (token) => ["user", "current", token],
};

export const useCurrentUser = (options = {}) => {
  const token = localStorage.getItem("jwtToken");

  return useQuery({
    queryKey: userKeys.current(token), // Include token in query key
    queryFn: async () => {
      console.log("Fetching user with token:", token ? "present" : "missing");
      const response = await UserService.getUserSimpleData();
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    retry: (failureCount, error) => {
      // Don't retry on auth errors
      if (error?.response?.status === 401) {
        return false;
      }
      return failureCount < 2;
    },
    ...options,
  });
};
