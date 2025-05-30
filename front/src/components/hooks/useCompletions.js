import { useQuery } from "@tanstack/react-query";
import CompletionService from "../../services/completionService.js";

export const completionKeys = {
  all: ["completions"],
  byHabit: (habit) => ["completions", "habit", habit],
};

export const useCompletions = (year) => {
  return useQuery({
    queryKey: ["completions", year],
    queryFn: async () => {
      const response = await CompletionService.getAll(year);
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });
};

export const useCompletionsByHabit = (habit, year) => {
  return useQuery({
    queryKey: ["completions", "habit", habit, year],
    queryFn: async () => {
      const response = await CompletionService.getAllByHabit(habit, year);
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });
};

export const useCompletionsOperations = (year, habit) => {
  const completions = useCompletions(year);
  const completionsByDay = useCompletionsByHabit(habit, year);

  return {
    completions: completions.data || [],
    completionsByDay: completionsByDay.data || [],
    isLoading: completions.isLoading || completionsByDay.isLoading,
    isError: completions.isError || completionsByDay.isError,
    error: completions.error || completionsByDay.error,
    isRefetching: completions.isRefetching || completionsByDay.isRefetching,
    refetch: async () => {
      await Promise.all([completions.refetch(), completionsByDay.refetch()]);
    },
  };
};
