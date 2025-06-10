import axiosInstance from "./axiosInstance";

const CompletionService = {
  getAll: async (year) => {
    return await axiosInstance.get(`/completions/summary`, {
      params: {
        year,
      },
    });
  },

  getAllByHabit: async (habitId, year) => {
    return await axiosInstance.get(`/completions/habit-summary`, {
      params: {
        habitId,
        year,
      },
    });
  },
};

export default CompletionService;
