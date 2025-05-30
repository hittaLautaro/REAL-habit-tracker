import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import HabitService from "../../services/habitService.js";

export const habitKeys = {
  all: ["habits"],
  byDay: (day) => ["habits", "day", day],
};

export const useHabits = () => {
  return useQuery({
    queryKey: habitKeys.all,
    queryFn: async () => {
      const response = await HabitService.getAll();
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });
};

export const useHabitsByDay = (day) => {
  return useQuery({
    queryKey: habitKeys.byDay(day),
    queryFn: async () => {
      const response = await HabitService.getAllByDay(day);
      return response.data;
    },
    enabled: !!day,
    staleTime: 2 * 60 * 1000,
  });
};

export const useCreateHabit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newHabit) => {
      const response = await HabitService.save(newHabit);
      return response.data;
    },
    onSuccess: (newHabit) => {
      queryClient.setQueryData(habitKeys.all, (oldHabits) => {
        return oldHabits ? [...oldHabits, newHabit] : [newHabit];
      });
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: habitKeys.all });
    },
  });
};

export const useUpdateHabit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, updatedData }) => {
      const response = await HabitService.update(id, updatedData);
      return response.data;
    },
    onSuccess: (updatedHabit, variables) => {
      queryClient.setQueryData(habitKeys.all, (oldHabits) => {
        return (
          oldHabits?.map((habit) =>
            habit.id === variables.id ? updatedHabit : habit
          ) || []
        );
      });

      queryClient.invalidateQueries({
        queryKey: ["habits", "day"],
        exact: false,
      });
    },
  });
};

export const useUpdateHabitCompletion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, updatedData }) => {
      const response = await HabitService.updateIsCompleted(id, updatedData);
      return response.data;
    },
    onMutate: async ({ id, updatedData }) => {
      await queryClient.cancelQueries({ queryKey: habitKeys.all });

      const previousHabits = queryClient.getQueryData(habitKeys.all);

      queryClient.setQueryData(habitKeys.all, (oldHabits) => {
        return (
          oldHabits?.map((habit) =>
            habit.id === id ? { ...habit, ...updatedData } : habit
          ) || []
        );
      });

      return { previousHabits };
    },
    onError: (err, variables, context) => {
      if (context?.previousHabits) {
        queryClient.setQueryData(habitKeys.all, context.previousHabits);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: habitKeys.all });
    },
  });
};

export const useDeleteHabit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      await HabitService.deleteById(id);
      return id;
    },
    onSuccess: (deletedId) => {
      queryClient.setQueryData(habitKeys.all, (oldHabits) => {
        return oldHabits?.filter((habit) => habit.id !== deletedId) || [];
      });
    },
  });
};

export const useDeleteAllHabits = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await HabitService.deleteAll();
    },
    onSuccess: () => {
      queryClient.setQueryData(habitKeys.all, []);
      queryClient.invalidateQueries({
        queryKey: ["habits"],
        exact: false,
      });
    },
  });
};

export const useUpdateHabitsOrderAndCompletions = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (localHabits) => {
      const response = await HabitService.updateAll(localHabits);
      return response.data;
    },
    onMutate: async (localHabits) => {
      await queryClient.cancelQueries({ queryKey: habitKeys.all });

      const previousHabits = queryClient.getQueryData(habitKeys.all);
      queryClient.setQueryData(habitKeys.all, localHabits);

      return { previousHabits };
    },
    onError: (err, variables, context) => {
      if (context?.previousHabits) {
        queryClient.setQueryData(habitKeys.all, context.previousHabits);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: habitKeys.all });
    },
  });
};

export const useHabitsOperations = () => {
  const habits = useHabits();
  const createHabit = useCreateHabit();
  const updateHabit = useUpdateHabit();
  const deleteHabit = useDeleteHabit();
  const updateCompletion = useUpdateHabitCompletion();
  const deleteAll = useDeleteAllHabits();
  const updateOrder = useUpdateHabitsOrderAndCompletions();

  return {
    // Data
    habits: habits.data || [],
    isLoading: habits.isLoading,
    isError: habits.isError,
    error: habits.error,
    isRefetching: habits.isRefetching,

    // Operations
    createHabit: createHabit.mutate,
    updateHabit: updateHabit.mutate,
    deleteHabit: deleteHabit.mutate,
    updateCompletion: updateCompletion.mutate,
    deleteAll: deleteAll.mutate,
    updateOrder: updateOrder.mutate,

    // Loading states for each operation
    isCreating: createHabit.isPending,
    isUpdating: updateHabit.isPending,
    isDeleting: deleteHabit.isPending,
    isDeletingAll: deleteAll.isPending,

    // Manual refetch
    refetch: habits.refetch,
  };
};
