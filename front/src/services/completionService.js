import axiosInstance from "./axiosInstance";

const CompletionService = {
  getAll: async (year) => {
    return await axiosInstance.get(`/completions/${year}`);
  },
};

export default CompletionService;
