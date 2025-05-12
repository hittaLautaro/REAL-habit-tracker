import axiosInstance from "./axiosInstance";

const CompletionService = {
  getAll: async (year) => {
    return await axiosInstance.get(`/completions/summary`, {
      params: {
        year,
      },
    });
  },

  getAllByHabit: async (year, habitId) => {
    return await axiosInstance.get(`/completions/habit-summary`, {
      params: {
        year,
        habitId,
      },
    });
  },
};

export default CompletionService;
