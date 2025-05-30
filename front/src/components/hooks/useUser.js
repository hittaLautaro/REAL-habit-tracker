import { useQuery } from "@tanstack/react-query";
import UserService from "../../services/userService.js";

export const userKeys = {
  current: ["user", "current"],
};

export const useCurrentUser = () => {
  return useQuery({
    queryKey: userKeys.current,
    queryFn: async () => {
      const response = await UserService.getUserSimpleData(); // no id needed here
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });
};
